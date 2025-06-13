import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/router";
import {UserData} from "@/types";

const jobRoles = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Product Manager",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile Developer",
    "QA Engineer",
    "Other"
];

export default function EditPage() {
    const [userData, setUserData] = useState<UserData| null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const ref = doc(db, "users", user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    // Ensure all required fields have default values
                    const userData: UserData = {
                        username: data.username || "",
                        fullname: data.fullname || "",
                        email: data.email || "",
                        name: data.name || "",
                        role: data.role || "",
                        bio: data.bio || "",
                        projects: data.projects?.length ? data.projects : [{ title: "", description: "", link: "" }]
                    };
                    setUserData(userData);
                } else {
                    // Create a new user with default values
                    const newUser: UserData = {
                        username: "",
                        fullname: user.displayName || "",
                        email: user.email || "",
                        name: user.displayName || "",
                        role: "",
                        bio: "",
                        projects: [{ title: "", description: "", link: "" }]
                    };
                    setUserData(newUser);
                }
                setLoading(false);
            } else {
                router.push("/login");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, index?: number) => {
        if (!userData) return; // Add this check

        const { name, value } = e.target;
        if (name.startsWith("project-") && typeof index === "number") {
            const field = name.split("-")[1];
            const updatedProjects = [...userData.projects];
            // @ts-ignore
            updatedProjects[index][field] = value;
            setUserData({ ...userData, projects: updatedProjects });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const addProject = () => {
        if (!userData) return; // Add this check

        setUserData({
            ...userData,
            projects: [...userData.projects, { title: "", description: "", link: "" }]
        });
    };

    const removeProject = (index: number) => {
        if (!userData || userData.projects.length <= 1) return; // Add null check

        const updatedProjects = [...userData.projects];
        updatedProjects.splice(index, 1);
        setUserData({
            ...userData,
            projects: updatedProjects
        });
    };

    const save = async () => {
        const user = auth.currentUser;
        if (!user) return;
        try {
            await setDoc(doc(db, "users", user.uid), userData);
            router.push("/preview");
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Failed to save portfolio. Please try again.");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 space-y-6">

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Edit Your Portfolio</h1>
                    <p className="mt-2 text-sm text-gray-600">Customize your professional profile</p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                placeholder="John Doe"
                                value={userData?.fullname}
                                onChange={handleChange}
                                disabled={true}
                            />
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                placeholder="johndoe"
                                value={userData?.username}
                                onChange={handleChange}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Professional Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            value={userData?.role}
                            onChange={handleChange}
                        >
                            <option value="">Select your role</option>
                            {jobRoles.map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            rows={4}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            placeholder="Tell us about yourself..."
                            value={userData?.bio}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Projects</h2>
                        <p className="text-sm text-gray-500 mb-4">Showcase your best work to potential employers or
                            clients.</p>

                        {userData?.projects.map((project, idx) => (
                            <div key={idx} className="mb-6 p-4 border border-gray-200 rounded-lg relative">
                                {userData.projects.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProject(idx)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                        aria-label="Remove project"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </button>
                                )}

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor={`project-title-${idx}`}
                                               className="block text-sm font-medium text-gray-700">
                                            Project Title
                                        </label>
                                        <input
                                            id={`project-title-${idx}`}
                                            name="project-title"
                                            type="text"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            placeholder="Awesome Project"
                                            value={project.title}
                                            onChange={(e) => handleChange(e, idx)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`project-description-${idx}`}
                                               className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            id={`project-description-${idx}`}
                                            name="project-description"
                                            rows={3}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            placeholder="Describe the project and your role in it..."
                                            value={project.description}
                                            onChange={(e) => handleChange(e, idx)}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`project-link-${idx}`}
                                               className="block text-sm font-medium text-gray-700">
                                            Project Link (URL)
                                        </label>
                                        <input
                                            id={`project-link-${idx}`}
                                            name="project-link"
                                            type="url"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                                            placeholder="https://example.com/project"
                                            value={project.link}
                                            onChange={(e) => handleChange(e, idx)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addProject}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                      clipRule="evenodd"/>
                            </svg>
                            Add Another Project
                        </button>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={() => router.push("/preview")}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={save}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Portfolio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}