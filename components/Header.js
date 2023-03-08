import Image from "next/image";
import { useRouter } from "next/dist/client/router";

function Header() {
    const router = useRouter();

    return (
        <div>
            <header className="grid grid-cols-2 py-5 px-5 h-28 min-h-full">
                <div onClick={() => router.push("/")} className="relative cursor-pointer">
                    <Image src='/logo.png'
                    fill
                    alt="art-guide-image"
                    className="object-contain object-left"
                    />
                </div>

            </header>
        </div>
    )
}    

export default Header;