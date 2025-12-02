import PortalDefaultLogo from "@/components/_shared/PortalDefaultLogo";
import { useTheme } from "@/components/theme/theme-provider";
import Image from "next/image";
import Link from "next/link";
import { RiInstagramLine, RiMailLine } from "react-icons/ri";

interface IconProps {
  className: string;
  "aria-hidden": boolean;
}

const LighterThemeFooter: React.FC = () => {
  const { theme } = useTheme();
  const navigation = {
    about: [
      {
        name: "About Us",
        href: "https://culturedata.io/about/",
        target: "_blank",
      },
      {
        name: "Our Strategy",
        href: "https://portaljs.com",
      },
      {
        name: "Our Council",
        href: "https://culturedata.io/about/council",
        target: "_blank",
      },
    ],
    useful: [
      { name: "Commoners", href: "/commoners" },
      {
        name: "Request data",
        href: "https://culturedata.io/data/request",
        target: "_blank",
      },
      {
        name: "Login",
        href: "https://cloud.portaljs.com/auth/signin",
        target: "_blank",
      },
    ],
    getStarted: [
      {
        name: "Find data",
        href: "/search",
      },
      {
        name: "Publish data",
        href: "https://culturedata.io/data/publish",
        target: "_blank",
      },
      {
        name: "Get help",
        href: "https://culturedata.io/help",
        target: "_blank",
      },
    ],
    social: [
      {
        name: "instagram",
        href: "https://www.instagram.com/culturedatacommons",
        icon: (props: IconProps) => (
          <RiInstagramLine className="text-4xl" {...props} />
        ),
      },
      {
        name: "email",
        href: "https://culturedata.io/contact",
        icon: (props: IconProps) => (
          <RiMailLine className="text-4xl" {...props} />
        ),
      },
    ],
  };

  return (
    <footer className="bg-accent-50  mt-[155px]">
      <div
        className={`custom-container flex flex-col flex-wrap py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap`}
      >
        <div className="justify-between w-full text-center md:text-left lg:flex">
          <div className="w-full lg:w-1/3 md:w-1/2">
            <h2 className="mt-4 mb-4 font-roboto font-black">
              ABOUT THE COMMONS
            </h2>
            <ul className="space-y-4 text-sm list-none">
              {navigation.about.map((item) => (
                <li key={item.name}>
                  <Link
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    href={item.href}
                    className="font-roboto font-normal hover:text-accent transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/3 md:w-1/2">
            <h2 className="mt-4 mb-4 font-roboto font-black">USEFUL LINKS</h2>
            <ul className="space-y-4 text-sm list-none">
              {navigation.useful.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="font-roboto font-normal hover:text-accent transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/3 md:w-1/2">
            <h2 className="mt-4 mb-4 font-roboto font-black">GET STARTED</h2>
            <ul className="space-y-4 text-sm list-none">
              {navigation.getStarted.map((item) => (
                <li key={item.name}>
                  <Link
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    href={item.href}
                    className="font-roboto font-normal hover:text-accent transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between text-center md:text-left">
          <h2 className="mt-4 mb-4 font-roboto font-black">SOCIAL MEDIA</h2>
          <div className="flex mt-3 space-x-5 justify-center md:justify-start">
            {navigation.social.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:text-accent"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="flex h-6 w-6" aria-hidden={true} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`custom-container flex flex-col flex-wrap py-6 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap`}
      >
  
      </div>
    </footer>
  );
};

export default LighterThemeFooter;
