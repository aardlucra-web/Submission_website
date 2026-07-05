const siteData = {

    // left side of hero
  hero: {
    name: "hi, i'm adrianne",
    subtitle: "cs student · developer · builder of things",
    avatar: "images/avatar.png"
  },

//about page stuff
  about: {
    fullName: "Adrianne Ramos",
    location: "Melbourne, AU",
    school: "SAE University College",
    bio: "Backend-leaning CS student with a love for Python, clean code, and building things people actually enjoy using. Currently in my second trimester at SAE Australia, working through web dev, scripting, data structures, and more.",
    interests: [
      "TCG/CCG",
      "League of Legends (top 200 suppport on asia servers)",
      "anime",
      "art",
      "tekken 7",
      "friend slop games",
      "Minecraft modding",
      "ORV / manhwa",
      "Linux ricing",
      "proffessional larper",
    ],
  },

//for my skills page
  skills: {
    hard: [
      { name: "Python / backend", value: 85 },
      { name: "HTML / CSS / JS",  value: 70 },
      { name: "C# / OOP",         value: 55 },
      { name: "Data Structures",  value: 60 },
      { name: "Scripting / Bash", value: 50 },
    ],
    soft: [
      "Self-directed learning",
      "Problem-solving under ambiguity",
      "Working independently",
      "locking in",
    ],
  },

//for my project
  projects: [
    {
      title: "Portfolio Site",
      description: "This very site — data-driven panels, dark mode, fully responsive. Built for CST150.",
      tags: ["HTML", "CSS", "JS"],
      link: "https://aardlucra-web.github.io/portfolio/",
      linkLabel: "view live",
    },
    {
      title: "Weather Widget",
      description: "Melbourne 7-day min/max forecast pulled from the Open-Meteo API, displayed as a clean table.",
      tags: ["HTML", "JS", "API"],
      link: "https://github.com/aardlucra-web",
      linkLabel: "view repo",
    },
    {
      title: "TaskMate",
      description: "Agile student task reminder web app. Group project — i was Scrum Master across 4 sprints.",
      tags: ["Agile", "HTML", "JS"],
      link: "https://github.com/aardlucra-web",
      linkLabel: "view repo",
    },
    {
      title: "Book Tracker",
      description: "Python CLI app using two classes (Book, Library), pipe-delimited file I/O, and a menu-driven interface.",
      tags: ["Python", "OOP", "CLI"],
      link: "https://github.com/aardlucra-web",
      linkLabel: "view repo",
    },
  ],

  contact: {
    email: "brentramos741@gmail.com",
    socials: [
      {
        label: "GitHub",
        url: "https://github.com/aardlucra-web",
        icon: "github",
      },
    ],
  },

};
