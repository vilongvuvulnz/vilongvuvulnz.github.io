import { LoaderCircle } from 'lucide-react';

export default function LoadingScreen() {
    return (
        // This div centers the content on the full screen
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">
            <div className="flex flex-col items-center gap-4">
                {/* The spinning loader icon */}
                <LoaderCircle
                    size={48}
                    className="animate-spin text-blue-500"
                />
                {/* Optional: Loading text */}
                <p className="text-lg text-gray-500 dark:text-gray-400">
                    Loading...
                </p>
            </div>
        </div>
    );
}