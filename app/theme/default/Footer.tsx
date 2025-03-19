import { Link } from "@remix-run/react";

export function Footer({ settings }: { settings: any }) {

  const mailtoUrl = `mailto:${settings?.email}`;
  return (
    <div className="w-full flex flex-row ">
      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link to="/about" target="_blank" className="link link-hover">About me</Link>
          {settings?.email && <Link to={mailtoUrl}> Contact Me </Link>}
        </nav>
      </footer>
    </div>
  )
}
