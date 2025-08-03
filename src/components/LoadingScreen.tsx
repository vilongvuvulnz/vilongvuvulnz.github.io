import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function LoadingScreen() {
	const [imgError, setImgError] = useState(false);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900">  
			<div className="flex flex-col items-center text-black dark:text-white">
                {imgError ? (
                    <LoaderCircle size={100} className="animate-spin mb-4" />
                ) : (
                    <img
                        width={200}
                        height={200}
                        src="/elaina.webp"
                        loading="eager"
                        onError={() => setImgError(true)}
                    />
                )}
				<p className="text-2xl font-bold">
					Loading...
				</p>
			</div>
		</div>
	);
}
