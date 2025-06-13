// src/pages/index.tsx
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
            <h1 className="text-4xl font-bold mb-4">Freelancer Portfolio Builder</h1>
            <p className="mb-6">Create and share your professional portfolio easily.</p>
            <Link href="/login">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Get Started
                </button>
            </Link>
        </div>
    );
}
