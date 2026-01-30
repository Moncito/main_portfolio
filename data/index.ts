export const navItems = [
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
];

export const gridItems = [
    {
        id: 1,
        title: "Building Through Collaboration",
        description: "I design and develop with teamwork, clarity, and shared goals at the core of every project.",
        className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
        imgClassName: "w-full h-full",
        titleClassName: "justify-end",
        img: "/images/3.jpg",
        spareImg: "",
    },
    {
        id: 2,
        title: "Anywhere",
        description: "Comfortable working across teams, tools, and time zones with structured and reliable communication.",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "/images/1.jpg",
        spareImg: "",
    },
    {
        id: 3,
        title: "My Technical Foundation",
        description: "Modern web, mobile, and cloud technologies focused on performance, scalability, and clean architecture.",
        className: "lg:col-span-2 md:col-span-3 md:row-span-2",
        imgClassName: "",
        titleClassName: "justify-center",
        img: "/images/5.jpg",
        spareImg: "",
    },
    {
        id: 4,
        title: "Design with Purpose",
        description: "I care deeply about detail, motion, and interfaces that feel intuitive and intentional.",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-start",
        img: "/images/2.jpg",
        spareImg: "",
    },
    {
        id: 5,
        title: "Turning Ideas into Systems",
        description: "From concept to deployment—engineering solutions that are maintainable, scalable, and user-focused.",
        className: "md:col-span-3 md:row-span-2",
        imgClassName: "w-full h-full object-cover bottom-0",
        titleClassName: "justify-center md:justify-start lg:justify-center",
        img: "/images/4.jpg",
        spareImg: "",
    },

    {
        id: 6,
        title: "Let’s Build Something Impactful",
        description: "Open to collaborations, internships, freelance work, and meaningful tech projects.",
        className: "lg:col-span-2 md:col-span-3 md:row-span-1",
        imgClassName: "",
        titleClassName: "justify-center md:max-w-full text-center",
        img: "",
        spareImg: "",
    },
];

const ICONS = {
    next: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    tailwind: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    typescript: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    react: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    gsap: "https://cdn.worldvectorlogo.com/logos/gsap.svg",
    framer: "https://raw.githubusercontent.com/devicons/devicon/master/icons/framer/framer-original.svg",
    three: "https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg",
    sql: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    github: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
    linkedin: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original.svg",
    twitter: "https://raw.githubusercontent.com/devicons/devicon/master/icons/twitter/twitter-original.svg"
}

export const projects = [
    {
        id: 1,
        title: "Luwas Travel & Tours",
        des: "A comprehensive travel agency platform with dynamic booking and itinerary management.",
        img: "/images/proj2.png",
        iconLists: [ICONS.next, ICONS.tailwind, ICONS.typescript,],
        link: "https://luwas-travel.tours/",
    },
    {
        id: 2,
        title: "AI Mock Interview",
        des: "Intelligent career preparation platform utilizing AI to simulate realistic interview environments.",
        img: "/images/proj1.png",
        iconLists: [ICONS.react, ICONS.tailwind, ICONS.typescript, ICONS.three,],
        link: "https://ai-mock-interview-swart-phi.vercel.app/",
    },
    {
        id: 3,
        title: "Luwas Mobile App",
        des: "React Native companion to Luwas Travel, providing seamless booking on the go.",
        img: "/images/proj3.png",
        iconLists: [ICONS.react, ICONS.typescript, ICONS.framer],
        link: "https://github.com/Moncito/luwas-mobile",
    },
    {
        id: 4,
        title: "Dental Appointment Hub",
        des: "Automated dental appointment system with SQL-backed scheduling and patient management.",
        img: "/images/proj4.png",
        iconLists: [ICONS.next, ICONS.tailwind,],
        link: "https://dental-sql.vercel.app/",
    },
];

export const testimonials = [
    {
        quote:
            "Working with Sainty was a great experience. He’s The Best, reliable, and delivered high-quality frontend work that brought our vision to life.",
        name: "Michael Johnson",
        title: "Director of AlphaStream Technologies",
    },
    {
        quote:
            "Working with this developer was a game-changer for our project. The attention to detail and the ability to translate complex requirements into beautiful, functional code was impressive.",
        name: "Sarah Chen",
        title: "Founder of TechVibe",
    },
];

export const companies = [
    {
        id: 1,
        name: "firebase",
        img: "/svg/firebase.svg",
        nameImg: "",
    },
    {
        id: 2,
        name: "appwrite",
        img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/appwrite/appwrite-original.svg",
        nameImg: "",
    },
    {
        id: 3,
        name: "vercel",
        img: "/svg/vercel.svg",
        nameImg: "",
    },
];

export const workExperience = [
    {
        id: 1,
        title: "Outreach Consult...",
        desc: "Strategic market expansion and client acquisition infrastructure designer.",
        className: "md:col-span-2",
        thumbnail: "/images/workedge.jpg",
    },
    {
        id: 2,
        title: "Outreach Manager",
        desc: "Led cross-functional teams to scale reach and optimize conversion funnels.",
        className: "md:col-span-2",
        thumbnail: "/images/workedge.jpg",
    },
    {
        id: 3,
        title: "Freelance Fullstack Developer",
        desc: "Architecting end-to-end digital solutions with modern frameworks and robust backends.",
        className: "md:col-span-2",
        thumbnail: ICONS.next,
    },
    {
        id: 4,
        title: "Freelance Mobile Developer",
        desc: "Crafting native and cross-platform mobile experiences with a focus on motion and performance.",
        className: "md:col-span-1",
        thumbnail: ICONS.react,
    },
];

export const socialMedia = [
    {
        id: 1,
        img: ICONS.github,
        link: "https://github.com/Moncito"
    },
    {
        id: 2,
        img: "/images/threads.png",
        link: "https://www.threads.com/@saints_aintdead"
    },
    {
        id: 3,
        img: ICONS.linkedin,
        link: "https://www.linkedin.com/in/moncito-glenn-hernandez-238605261/"
    },
];
