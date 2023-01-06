import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserProfile } from "../../components/user_profile";
import { useRouter } from "next/router";
import { User } from "../../components/user";

export default function Page() {
    const [user, setUser] = useState({} as User);
    const router = useRouter();
    const { pid } = router.query;
    const handle = typeof pid === "string" ? pid : pid?.at(0);

    useEffect(() => {
        if (!router.isReady) return;
        if (!handle) {
            console.log(`Invalid handle: ${handle}`);
            return;
        }

        let fetchData = async () => {
            let user = await fetchUser(handle);
            setUser(user);
        };

        fetchData().catch(console.error);
    }, [router, pid]);

    return (
        <div className="">
            <Head>
                <title>Pentagon</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">
                <h2>User profile</h2>
                <UserProfile {...user} />
                <Link href={"/"}>{`< Back Home`}</Link>
            </main>
        </div>
    );
}

async function fetchUser(handle: string) {
    let response = await fetch("/api/get_user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(handle),
    });
    let user = await response.json();
    return user;
}