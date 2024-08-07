
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (token) return redirect('/admin');
    return (
        <>
            {children}
        </>

    );
}
