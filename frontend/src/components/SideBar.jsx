import React, { useEffect, useState } from "react";
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
    Sparkles
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getConversation } from "../features/getConversation";
import { createConversation } from "../features/createConversation";
import logOut from "../features/logOut";

import {
    addConversation,
    setConversation,
    selectConversation,
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
                        {/* <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                MultiAI
              </h2> */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg">

                            <Sparkles className="text-white" size={20} />

                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-white">
                                MultiAI
                            </h2>
                            <span className="text-[10px] text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded-full font-semibold">
                                free
                            </span>
                        </div>
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
                    <button
                        onClick={handleCreateConversation}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                    >
                        <SquarePen size={18} className="stroke-[1.5]" />
                    </button>
                )}
            </div>

            {/* New Chat Button */}
            <div className={`p-4 flex justify-center`}>
                <button
                    onClick={handleCreateConversation}
                    className={`flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#5f33e1] to-[#8d44e7] text-white shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer
            ${collapsed ? "w-10 h-10 p-0 rounded-xl" : "w-full gap-2.5 py-3 text-sm font-semibold"}`}
                >
                    <Plus size={18} className="stroke-[2.5]" />
                    {!collapsed && <span>New Chat</span>}
                </button>
            </div>

            {/* Recents */}
            <div className="flex-1 overflow-y-auto px-3 py-2 custom-scrollbar">
                {!collapsed && (
                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        Recents
                    </p>
                )}

                {conversations?.length === 0 ? (
                    <div className="mt-10 text-center text-xs text-slate-600">
                        {!collapsed && "No conversations yet"}
                    </div>
                ) : (
                    <div className="space-y-2">
                        {conversations.map((conv, index) => {
                            const isActive = selectedConversation?._id === conv._id;
                            return (
                                <button
                                    key={conv._id || index}
                                    onClick={() => {
                                        dispatch(selectConversation(conv));
                                        setMobileOpen(false);
                                    }}
                                    title={conv.title || `Conversation ${index + 1}`}
                                    className={`group flex items-center rounded-2xl transition-all duration-200 border cursor-pointer
                    ${collapsed ? "justify-center p-1 w-10 h-10 mx-auto" : "w-full gap-3.5 px-3 py-2.5"}
                    ${isActive
                                            ? "bg-[#15172b] border-[#292b52] text-white shadow-sm"
                                            : "bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <div className={`flex items-center justify-center rounded-xl border shrink-0 transition-all duration-200
                    ${collapsed ? "w-8 h-8" : "w-9 h-9"}
                    ${isActive
                                            ? "bg-[#202246] border-[#3e4282]/50 text-indigo-400"
                                            : "bg-slate-800/20 border-slate-700/20 text-slate-400 group-hover:bg-slate-700/30 group-hover:text-slate-200"
                                        }`}
                                    >
                                        <MessageSquare size={collapsed ? 14 : 16} className="stroke-[2]" />
                                    </div>

                                    {!collapsed && (
                                        <span className={`truncate text-sm ${isActive ? "font-semibold" : "font-medium text-slate-300"}`}>
                                            {conv.title || `Conversation ${index + 1}`}
                                        </span>
                                    )}
                                </button>
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

            {/* Desktop Sidebar */}
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
