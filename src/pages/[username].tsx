import { useRouter } from "next/router";
import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useEffect, useState } from "react";
import {Project, UserData} from "@/types";

export default function PublicPortfolio() {
    const router = useRouter();
    const { username } = router.query;
    const [data, setData] = useState<UserData| null>(null);


    useEffect(() => {
        if (!username) return;
        const fetchData = async () => {
            const q = query(collection(db, "users"), where("username", "==", username));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const userData = snapshot.docs[0].data() as UserData; // Type assertion here
                setData(userData);
            }
        };
        fetchData();
    }, [username]);

    if (!data) return <div className="p-8">Loading public profile...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-gray-500">{data.role}</p>
            <p className="mt-2 mb-6">{data.bio}</p>

            <h2 className="text-xl font-semibold">Projects</h2>
            <div className="space-y-3 mt-2">
                {data.projects.map((p: Project, i: number) => (
                    <div key={i} className="p-4 border rounded">
                        <h3 className="font-bold">{p.title}</h3>
                        <p>{p.description}</p>
                        {p.link && (
                            <a
                                className="text-blue-600 underline"
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
