import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumemind" },
        { name: "description", content: "Smart feedback for your dream Job!" },
    ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if (!auth.isAuthenticated) {
            return;
        }
    }, [auth.isAuthenticated]);

    useEffect(() => {
        const loadResume = async () => {
            if (!auth.isAuthenticated) return; // Only load if authenticated
            setLoadingResumes(true);
            const resumes = (await kv.list("resume:*", true)) as KVItem[];
            const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);
            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        };
        loadResume();
    }, [auth.isAuthenticated]);

    const handleLogin = () => {
        navigate("/auth?next=/upload");
    };

    const handleLogout = () => {
        auth.signOut(); // Assuming this exists; clear auth state
        navigate("/");  // Redirect to home page after logout
    };

    return (
        <main className="bg-[url('/public/images/bg-main.svg')] bg-cover min-h-screen">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16 text-center">
                    <h1>Track your Applications and Resume Ratings</h1>
                    {!loadingResumes && resumes.length === 0 ? (
                        <h2>No resume found. Upload your first resume to get feedback.</h2>
                    ) : (
                        <h2>Review your submission and check AI-Powered feedback.</h2>
                    )}
                </div>

                {/* Authentication Buttons */}
                <div className="flex flex-col items-center justify-center mt-10 gap-4">
                    {!auth.isAuthenticated ? (
                        <button
                            onClick={handleLogin}
                            className="primary-button w-fit text-xl font-semibold"
                        >
                            Login / Signup
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="secondary-button w-fit text-xl font-semibold"
                        >
                            Logout
                        </button>
                    )}
                </div>

                {loadingResumes && (
                    <div className="flex flex-col items-center justify-center mt-10">
                        <img
                            src="/public/images/resume-scan-2.gif"
                            alt="loading..."
                            className="w-[200px]"
                        />
                    </div>
                )}

                {!loadingResumes && resumes.length === 0 && auth.isAuthenticated && (
                    <div className="flex flex-col items-center justify-center mt-10 gap-4">
                        <Link
                            to="/upload"
                            className="primary-button w-fit text-xl font-semibold"
                        >
                            Upload Resume
                        </Link>
                    </div>
                )}

                {!loadingResumes && resumes.length > 0 && (
                    <div className="resumes-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {resumes.map((resume) => (
                            <ResumeCard key={resume.id} resume={resume} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
