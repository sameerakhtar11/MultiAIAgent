import React, { useEffect, useMemo, useState } from "react";
import {
    PanelLeft,
    PanelRight,
    Plus,
    MessageSquare,
    User,
    Menu,
    X,
    SquarePen,
    Coins,
    LogOut,
    Search,
    Pencil,
    Check
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getConversation } from "../features/getConversation";
import { createConversation } from "../features/createConversation";
import { updateConversationTitle as updateConversationTitleApi } from "../features/updateConversationTitle";
import logOut from "../features/logOut";

import {
    addConversation,
    setConversation,
    selectConversation,
    updateConversationTitle,
} from "../redux/conversationSlice";
import { setUserData } from "../redux/userSlice";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios";

function SideBar() {
    const dispatch = useDispatch();

    const { conversations, selectedConversation } = useSelector(
        (state) => state.conversation
    );

    const { userData } = useSelector((state) => state.user);

    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingValue, setEditingValue] = useState("");

    const loadConversations = async () => {
        try {
            const data = await getConversation();
            dispatch(setConversation(data));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (userData?._id) {
            loadConversations();
        }
    }, [userData?._id]);

    const handleCreateConversation = async () => {
        try {
            const data = await createConversation();
            dispatch(addConversation(data));
            dispatch(selectConversation(data));
            setMobileOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setImageError(false);
    }, [userData?.avatar]);

    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token });
            dispatch(setUserData(data));
        } catch (error) {
            console.log(error);
        }
    };

    const googleLogin = async () => {
        try {
            const { signInWithPopup } = await import("firebase/auth");
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();
            await handleLogin(token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
            await auth.signOut();
            dispatch(setUserData(null));
        } catch (err) {
            console.log(err);
        }
    };

    const startRename = (e, conv, index) => {
        e.stopPropagation();
        setEditingId(conv._id || index);
        setEditingValue(conv.title || `Conversation ${index + 1}`);
    };

    const saveRename = async (conv) => {
        const title = editingValue.trim();
        setEditingId(null);
        if (!title || title === conv.title) return;

        dispatch(updateConversationTitle({ id: conv._id, title }));
        await updateConversationTitleApi(conv._id, title);
    };

    const filteredConversations = useMemo(() => {
        if (!search.trim()) return conversations;
        return conversations.filter((c) =>
            (c.title || "").toLowerCase().includes(search.trim().toLowerCase())
        );
    }, [conversations, search]);

    const SidebarContent = () => (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-4 mt-1">
                {!collapsed && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCollapsed(true)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                        >
                            <PanelLeft size={20} className="stroke-[1.5]" />
                        </button>

                        <h2 className="text-lg font-bold text-white">
                            CortexAI
                        </h2>
                    </div>
                )}

                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                    >
                        <PanelRight size={20} className="stroke-[1.5]" />
                    </button>
                )}

                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
                            free
                        </span>
                        <button
                            onClick={handleCreateConversation}
                            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                        >
                            <SquarePen size={18} className="stroke-[1.5]" />
                        </button>
                    </div>
                )}
            </div>

            {/* New Chat Button */}
            <div className="p-4 pb-2 flex justify-center">
                <button
                    onClick={handleCreateConversation}
                    className={`flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5f33e1] to-[#8d44e7] text-white shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer
            ${collapsed ? "w-10 h-10 p-0 rounded-xl" : "w-full gap-2.5 py-3 text-sm font-semibold"}`}
                >
                    <Plus size={18} className="stroke-[2.5]" />
                    {!collapsed && <span>New Chat</span>}
                </button>
            </div>

            {/* Search */}
            {!collapsed && (
                <div className="px-4 pb-2">
                    <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 focus-within:border-indigo-500/40 transition-colors">
                        <Search size={15} className="text-slate-500 shrink-0" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search chats..."
                            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
                        />
                    </div>
                </div>
            )}

            {/* Recents */}
            <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
                {!collapsed && (
                    <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        Recents
                    </p>
                )}

                {filteredConversations?.length === 0 ? (
                    <div className="mt-10 text-center text-xs text-slate-600">
                        {!collapsed && (search ? "No matching chats" : "No conversations yet")}
                    </div>
                ) : (
                    <div className="space-y-1">
                        {filteredConversations.map((conv, index) => {
                            const rowId = conv._id || index;
                            const isActive = selectedConversation?._id === conv._id;
                            const isEditing = editingId === rowId;

                            return (
                                <div
                                    key={rowId}
                                    onClick={() => {
                                        if (isEditing) return;
                                        dispatch(selectConversation(conv));
                                        setMobileOpen(false);
                                    }}
                                    title={conv.title || `Conversation ${index + 1}`}
                                    className={`group flex items-center rounded-xl transition-all duration-150 cursor-pointer
                    ${collapsed ? "justify-center p-1 w-10 h-10 mx-auto" : "w-full gap-2.5 px-3 py-2.5"}
                    ${isActive
                                            ? "bg-[#15172b] text-white"
                                            : "bg-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <MessageSquare
                                        size={collapsed ? 14 : 15}
                                        className={`shrink-0 stroke-[2] ${isActive ? "text-indigo-400" : "text-slate-500"}`}
                                    />

                                    {!collapsed && (
                                        isEditing ? (
                                            <input
                                                autoFocus
                                                value={editingValue}
                                                onChange={(e) => setEditingValue(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") saveRename(conv);
                                                    if (e.key === "Escape") setEditingId(null);
                                                }}
                                                onBlur={() => saveRename(conv)}
                                                className="flex-1 min-w-0 bg-transparent border-b border-indigo-500/50 text-sm text-white outline-none"
                                            />
                                        ) : (
                                            <span className={`flex-1 min-w-0 truncate text-sm ${isActive ? "font-semibold" : "font-medium"}`}>
                                                {conv.title || `Conversation ${index + 1}`}
                                            </span>
                                        )
                                    )}

                                    {!collapsed && !isEditing && (
                                        <button
                                            onClick={(e) => startRename(e, conv, index)}
                                            className="shrink-0 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                                            title="Rename"
                                        >
                                            <Pencil size={13} />
                                        </button>
                                    )}

                                    {!collapsed && isEditing && (
                                        <button
                                            onMouseDown={(e) => { e.preventDefault(); saveRename(conv); }}
                                            className="shrink-0 text-indigo-400 hover:text-indigo-300 p-1 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                                            title="Save"
                                        >
                                            <Check size={14} />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* User Profile */}
            <div className="border-t border-white/5 p-4 mt-auto">
                {userData ? (
                    <div className={`flex items-center justify-between rounded-2xl transition-all hover:bg-white/5
            ${collapsed ? "p-1 justify-center" : "p-2 gap-3"}`}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-800">
                                {userData.avatar && !imageError ? (
                                    <img
                                        src={userData.avatar}
                                        alt={userData.name}
                                        onError={() => setImageError(true)}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <User size={18} className="text-slate-400" />
                                    </div>
                                )}
                            </div>

                            {!collapsed && (
                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold text-slate-200">
                                        {userData.name || "User"}
                                    </h3>
                                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                                        Free Plan
                                    </p>
                                </div>
                            )}
                        </div>

                        {!collapsed && (
                            <div className="flex items-center gap-2 shrink-0">
                                <button title="Coins Balance" className="text-amber-500/95 hover:text-amber-400 transition cursor-pointer p-1">
                                    <Coins size={17} className="stroke-[1.8]" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    title="Logout"
                                    className="text-slate-400 hover:text-red-400 transition cursor-pointer p-1"
                                >
                                    <LogOut size={17} className="stroke-[1.8]" />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={googleLogin}
                        className="w-full rounded-xl bg-violet-600 py-3 text-white transition hover:bg-violet-700 font-semibold text-sm cursor-pointer"
                    >
                        {!collapsed ? "Login" : "L"}
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileOpen(true)}
                className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-[#18181B] text-white shadow-lg lg:hidden cursor-pointer"
            >
                <Menu size={20} />
            </button>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/5 bg-[#090b11] transition-all duration-300 lg:hidden
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${collapsed ? "w-20" : "w-72"}
        `}
            >
                <div className="flex items-center justify-end p-3">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <SidebarContent />
            </aside>

            {/* Desktop Sidebar — this whole block was missing, which is why nothing showed at full screen */}
            <aside
                className={`hidden lg:flex h-screen shrink-0 flex-col border-r border-white/5 bg-[#090b11] transition-all duration-300
        ${collapsed ? "w-20" : "w-72"}
        `}
            >
                <SidebarContent />
            </aside>
        </>
    );
}

export default SideBar;
