import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Preview() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth();
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/login");
                return;
            }

            try {
                const snap = await getDoc(doc(db, "users", user.uid));
                if (snap.exists()) {
                    setUserData(snap.data());
                }
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsub();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Portfolio Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find any portfolio data for your account.</p>
                    <button
                        onClick={() => router.push("/edit")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Create Your Portfolio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{userData.fullname} | Portfolio</title>
                <meta name="description" content={`Professional portfolio of ${userData.name}`} />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Header Section */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-gray-900">{userData.fullname}</h1>
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => router.push("/edit")}
                                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Edit Portfolio
                            </button>
                        </div>
                        <p className="text-lg text-gray-600 mt-1">{userData.role}</p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* About Section */}
                    <section className="mb-12">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {userData.bio || "No bio provided yet."}
                            </p>
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Projects</h2>

                        {userData.projects?.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {userData.projects.map((project: any, index: number) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                {project.title || "Untitled Project"}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {project.description || "No description provided."}
                                            </p>
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                >
                                                    View Project
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                                <p className="text-gray-500">No projects added yet.</p>
                            </div>
                        )}
                    </section>
                </main>

                {/* Footer */}
                <footer className="bg-white border-t mt-12 py-6">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
                        <p>© {new Date().getFullYear()} {userData.fullname}'s Portfolio</p>
                    </div>
                </footer>
            </div>
        </>
    );
}