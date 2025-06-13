import { useEffect, useState } from 'react';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FiEdit2, FiEye, FiLogOut, FiUser } from 'react-icons/fi';
import {UserData} from "@/types";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<UserData| null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (!user) {
                router.push('/login');
            } else {
                const userData: UserData = {
                    email: user.email || '',
                    username: user.displayName || '',
                    name: user.displayName || '',
                    role: 'user',
                    fullname: '',
                    bio: '',
                    projects: []
                };
                setUser(userData);
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Dashboard | Portfolio Builder</title>
                <meta name="description" content="Manage your portfolio" />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-800">Portfolio Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full">
                                    <FiUser className="text-blue-600" />
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-700">
                                    {user?.email || 'User'}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
                            >
                                <FiLogOut className="mr-1" />
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {/* Welcome Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                            <h2 className="text-2xl font-bold">Welcome back! </h2>
                            <p className="mt-1 text-blue-100">
                                Manage your professional portfolio
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Edit Portfolio Card */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    <FiEdit2 className="text-blue-600 text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Edit Portfolio
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Update your profile information, projects, and other details.
                                </p>
                                <button
                                    onClick={() => router.push('/edit')}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FiEdit2 className="mr-2" />
                                    Edit Now
                                </button>
                            </div>

                            {/* Preview Portfolio Card */}
                            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                                    <FiEye className="text-purple-600 text-xl" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Preview Portfolio
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    See how your portfolio looks to visitors.
                                </p>
                                <button
                                    onClick={() => router.push('/preview')}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                >
                                    <FiEye className="mr-2" />
                                    View Preview
                                </button>
                            </div>

                            {/* Coming Soon Card */}
                            {/*<div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">*/}
                            {/*    <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">*/}
                            {/*        <FiBriefcase className="text-green-600 text-xl" />*/}
                            {/*    </div>*/}
                            {/*    <h3 className="text-lg font-semibold text-gray-800 mb-2">*/}
                            {/*        Analytics (Coming Soon)*/}
                            {/*    </h3>*/}
                            {/*    <p className="text-gray-600 mb-4">*/}
                            {/*        Track visitors and engagement with your portfolio.*/}
                            {/*    </p>*/}
                            {/*    <button*/}
                            {/*        disabled*/}
                            {/*        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"*/}
                            {/*    >*/}
                            {/*        <FiBriefcase className="mr-2" />*/}
                            {/*        Coming Soon*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>

                        {/* Stats Section */}
                        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                            <h3 className="text-sm font-medium text-gray-500">
                                Quick Stats
                            </h3>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500">Portfolio Status</p>
                                    <p className="text-sm font-medium text-green-600">
                                        Published
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Last Updated</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t mt-8 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} Portfolio Builder. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}