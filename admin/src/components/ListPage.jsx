import React, { useState, useEffect, useMemo } from 'react';
import { doctorListStyles as d } from '../assets/dummyStyles';
import {
    BadgeIndianRupee,
    Eye,
    EyeOff,
    Search,
    Star,
    Trash2,
    User,
} from 'lucide-react';

// Helper functions
function formatDateISO(iso) {
    if (!iso || typeof iso !== 'string') return iso;
    const parts = iso.split('-');
    if (parts.length !== 3) return iso;
    const [y, m, dNum] = parts;
    const dateObj = new Date(Number(y), Number(m) - 1, Number(dNum));
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
        'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const day = String(Number(dNum));
    const month = monthNames[dateObj.getMonth()] || '';
    return `${day} ${month} ${y}`;
}

function normalizeToDateString(d) {
    if (!d) return null;
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return null;
    return dt.toISOString().split('T')[0];
}

function buildScheduleMap(schedule) {
    const map = {};
    if (!schedule || typeof schedule !== 'object') return map;
    Object.entries(schedule).forEach(([k, v]) => {
        const nd = normalizeToDateString(k) || String(k);
        map[nd] = Array.isArray(v) ? v.slice() : [];
    });
    return map;
}

function getSortedScheduleDates(scheduleLike) {
    let keys = [];
    if (Array.isArray(scheduleLike)) {
        keys = scheduleLike.map(normalizeToDateString).filter(Boolean);
    } else if (scheduleLike && typeof scheduleLike === 'object') {
        keys = Object.keys(scheduleLike).map(normalizeToDateString).filter(Boolean);
    }

    keys = Array.from(new Set(keys));
    const parsed = keys.map((ds) => ({ ds, date: new Date(ds) }));
    const dateVal = (d) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

    const today = new Date();
    const todayVal = dateVal(today);

    const past = parsed
        .filter((p) => dateVal(p.date) < todayVal)
        .sort((a, b) => dateVal(b.date) - dateVal(a.date));

    const future = parsed
        .filter((p) => dateVal(p.date) >= todayVal)
        .sort((a, b) => dateVal(a.date) - dateVal(b.date));

    return [...past, ...future].map((p) => p.ds);
}

const ListPage = () => {
    const API_BASE = import.meta.env.VITE_API_URL;
    const [doctors, setDoctors] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [query, setQuery] = useState('');
    const [showAll, setShowAll] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(false);

    const [isMobileScreen, setIsMobileScreen] = useState(false);
    useEffect(() => {
        function onResize() {
            if (typeof window === 'undefined') return;
            setIsMobileScreen(window.innerWidth < 640);
        }
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // Fetch doctors data from server using API
    async function fetchDoctors() {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/doctors`);
            const body = await res.json().catch(() => null);

            if (res.ok && body && body.success) {
                const list = Array.isArray(body.data)
                    ? body.data
                    : Array.isArray(body.doctors)
                        ? body.doctors
                        : [];
                const normalized = list.map((d) => {
                    const scheduleMap = buildScheduleMap(d.schedule || {});
                    return {
                        ...d,
                        schedule: scheduleMap,
                    };
                });
                setDoctors(normalized);
            } else {
                console.error('Failed to fetch doctors', { status: res.status, body });
                setDoctors([]);
            }
        } catch (err) {
            console.error('Network error fetching doctors', err);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctors();
    }, []);

    // Filter doctors based on query and filter status
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = doctors;
        if (filterStatus === 'available') {
            list = list.filter(
                (d) => (d.availability || '').toString().toLowerCase() === 'available'
            );
        } else if (filterStatus === 'unavailable') {
            list = list.filter(
                (d) => (d.availability || '').toString().toLowerCase() !== 'available'
            );
        }
        if (!q) return list;
        return list.filter((d) => {
            return (
                (d.name || '').toLowerCase().includes(q) ||
                (d.specialization || '').toLowerCase().includes(q)
            );
        });
    }, [doctors, query, filterStatus]);

    const displayed = useMemo(() => {
        if (showAll) return filtered;
        return filtered.slice(0, 6);
    }, [filtered, showAll]);

    function toggle(id) {
        setExpanded((prev) => (prev === id ? null : id));
    }

    // Delete doctor from server using API
    async function removeDoctor(id) {
        const doc = doctors.find((d) => (d._id || d.id) === id);
        if (!doc) return;
        const ok = window.confirm(`Delete ${doc.name}? This cannot be undone.`);
        if (!ok) return;

        try {
            const res = await fetch(`${API_BASE}/api/doctors/${id}`, {
                method: 'DELETE',
            });
            const body = await res.json().catch(() => null);
            if (!res.ok) {
                alert(body?.message || 'Failed to delete');
                return;
            }
            setDoctors((prev) => prev.filter((p) => (p._id || p.id) !== id));
            if (expanded === id) setExpanded(null);
        } catch (err) {
            console.error('delete error', err);
            alert('Network error deleting doctor');
        }
    }

    function applyStatusFilter(status) {
        setFilterStatus((prev) => (prev === status ? 'all' : status));
        setExpanded(null);
        setShowAll(false);
    }

    return (
        <div className={d.container}>
            <header className={d.headerContainer}>
                <div className={d.headerTopSection}>
                    <div className={d.headerIconContainer}>
                        <div className={d.headerIcon}>
                            <User size={20} className={d.headerIconSvg} />
                        </div>
                        <div>
                            <h1 className={d.headerTitle}>Find a Doctor</h1>
                            <p className={d.headerSubtitle}>
                                Search for a doctor by name or specialization
                            </p>
                        </div>
                    </div>
                    <div className={d.headerSearchContainer}>
                        <div className={d.searchBox}>
                            <Search size={16} className={d.searchIcon} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search Doctors, specialization"
                                className={d.searchInput}
                            />
                        </div>

                        <button
                            onClick={() => {
                                setQuery('');
                                setExpanded(null);
                                setShowAll(false);
                                setFilterStatus('all');
                            }}
                            className={d.clearButton}
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className={d.filterContainer}>
                    <button
                        onClick={() => applyStatusFilter('available')}
                        className={d.filterButton(filterStatus === 'available', 'emerald')}
                    >
                        Available
                    </button>

                    <button
                        onClick={() => applyStatusFilter('unavailable')}
                        className={d.filterButton(filterStatus === 'unavailable', 'red')}
                    >
                        Unavailable
                    </button>
                </div>
            </header>

            <main className={d.gridContainer}>
                {loading && <div className={d.loadingContainer}>Loading Doctors...</div>}
                {!loading && filtered.length === 0 && (
                    <div className={d.noResultsContainer}>
                        No doctors match your search
                    </div>
                )}

                {displayed.map((doc) => {
                    const id = doc._id || doc.id;
                    const isOpen = expanded === id;
                    const isAvailable =
                        (doc.availability || '').toString().toLowerCase() === 'available';

                    const scheduleMap = buildScheduleMap(doc.schedule || {});
                    const sortedDates = getSortedScheduleDates(scheduleMap);

                    return (
                        <article key={id} className={d.article}>
                            <div className={d.articleContent}>

                                {/* LEFT: IMAGE */}
                                <img
                                    src={doc.imageUrl || doc.image || "https://via.placeholder.com/80"}
                                    alt={doc.name}
                                    className={d.doctorImage}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/80?text=Doctor';
                                    }}
                                />

                                {/* RIGHT: CONTENT */}
                                <div className="flex-1 w-full">

                                    {/* HEADER */}
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">

                                        {/* LEFT SIDE */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className={d.doctorName}>{doc.name}</h3>

                                                <span className={d.availabilityBadge(isAvailable)}>
                                                    <span className={d.availabilityDot(isAvailable)} />
                                                    {isAvailable ? 'Available' : 'Unavailable'}
                                                </span>
                                            </div>

                                            <p className={d.doctorDetails}>
                                                {doc.specialization} • {doc.experience} yrs experience
                                            </p>

                                            <div className="flex items-center gap-3 mt-2">
                                                <div className={d.rating}>
                                                    <Star size={14} /> {doc.rating || 'N/A'}
                                                </div>

                                                <button
                                                    onClick={() => toggle(id)}
                                                    className={d.toggleButton(isOpen)}
                                                >
                                                    {isOpen ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* RIGHT SIDE */}
                                        <div className="flex flex-col items-start md:items-end gap-2 text-sm">

                                            <div className="flex items-center gap-2">
                                                <User size={14} />
                                                {doc.patients || 0} patients
                                            </div>

                                            <div className="flex items-center gap-1 font-semibold text-emerald-700">
                                                <BadgeIndianRupee size={14} />
                                                {doc.fee}
                                            </div>

                                            <button
                                                onClick={() => removeDoctor(id)}
                                                className={d.deleteButton}
                                            >
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* EXPANDABLE */}
                                    {isOpen && (
                                        <div className={d.expandCard}>

                                            {/* LEFT */}
                                            <div className="space-y-4">

                                                <div>
                                                    <h4 className={d.sectionTitle}>About</h4>
                                                    <p className={d.sectionText}>
                                                        {doc.about || `Dr. ${doc.name} is a ${doc.specialization} specialist with ${doc.experience} years experience.`}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className={d.sectionTitle}>Qualifications</h4>
                                                    <p className={d.sectionText}>
                                                        {doc.qualifications || `MBBS, MD - ${doc.specialization}`}
                                                    </p>
                                                </div>

                                                {sortedDates.length > 0 && (
                                                    <div>
                                                        <h4 className={d.sectionTitle}>Schedule</h4>

                                                        <div className="flex flex-wrap gap-2 mt-2">
                                                            {sortedDates.slice(0, 3).map((date) => (
                                                                <div key={date} className="bg-emerald-50 px-3 py-2 rounded-lg">
                                                                    <p className="text-xs text-emerald-600">
                                                                        {formatDateISO(date)}
                                                                    </p>

                                                                    <div className="flex flex-wrap gap-2 mt-2">
  {scheduleMap[date]?.map((slot, i) => (
    <span
      key={i}
      className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full whitespace-nowrap"
    >
      {slot}
    </span>
  ))}
</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* RIGHT */}
                                            <div className="flex md:flex-col justify-between md:justify-start gap-4 text-sm text-right">
                                                <div>
                                                    <p className="text-gray-400">Success</p>
                                                    <p className="font-semibold text-emerald-700">{doc.success || 98}%</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-400">Patients</p>
                                                    <p className="font-semibold text-emerald-700">{doc.patients}</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-400">Location</p>
                                                    <p className="font-semibold text-emerald-700">{doc.location}</p>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}

                {!loading && filtered.length > 6 && (
                    <div className={d.showMoreContainer}>
                        <button
                            onClick={() => setShowAll((s) => !s)}
                            className={d.showMoreButton}
                        >
                            {showAll ? 'Show Less' : `Show More Doctors (${filtered.length - 4})`}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ListPage;