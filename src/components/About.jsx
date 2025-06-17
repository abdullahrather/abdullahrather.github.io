import React, { useState, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";

const About = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const stats = useMemo(
    () => [
      { number: "5+", label: "Years Experience", targetValue: 5, suffix: "+" },
      {
        number: "20+",
        label: "Projects Completed",
        targetValue: 20,
        suffix: "+",
      },
      {
        number: "10+",
        label: "Technologies Mastered",
        targetValue: 10,
        suffix: "+",
      },
      { number: "24/7", label: "Support", targetValue: 24, suffix: "/7" },
    ],
    []
  );

  const skills = useMemo(
    () => [
      {
        name: "PHP & Laravel",
        level: 95,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
            />
          </svg>
        ),
      },
      {
        name: "Python & Flask",
        level: 88,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25c-.2 0-.37.09-.5.27-.13.18-.2.39-.2.63 0 .24.07.45.2.63.13.18.3.27.5.27.2 0 .37-.09.5-.27.13-.18.2-.39.2-.63 0-.24-.07-.45-.2-.63-.13-.18-.3-.27-.5-.27zm7.5 0c-.2 0-.37.09-.5.27-.13.18-.2.39-.2.63 0 .24.07.45.2.63.13.18.3.27.5.27.2 0 .37-.09.5-.27.13-.18.2-.39.2-.63 0-.24-.07-.45-.2-.63-.13-.18-.3-.27-.5-.27z' />
          </svg>
        ),
      },
      {
        name: "JavaScript & React",
        level: 85,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.099 2.21-.099zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.563-.48-.47-.92-.992-1.36-1.563z' />
          </svg>
        ),
      },
      {
        name: "MySQL & Database Design",
        level: 90,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
            />
          </svg>
        ),
      },
      {
        name: "API Development & Integration",
        level: 90,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
            />
          </svg>
        ),
      },
      {
        name: "Git",
        level: 85,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='currentColor'
            viewBox='0 0 24 24'
          >
            <path d='M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187' />
          </svg>
        ),
      },
      {
        name: "System Architecture",
        level: 88,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
            />
          </svg>
        ),
      },
      {
        name: "Team Leadership",
        level: 85,
        icon: (
          <svg
            className='skill-icon h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
        ),
      },
    ],
    []
  );

  // 🔥 NEW: Professional profiles data
  const professionalProfiles = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/abdullahrather",
      description: "Professional network & career highlights",
      icon: (
        <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      ),
      color: "bg-[#0077b5] hover:bg-[#005885]",
      textColor: "text-white",
    },
    {
      name: "GitHub",
      url: "https://github.com/abdullahrather",
      description: "Open source projects & code repositories",
      icon: (
        <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
      ),
      color: "bg-[#333] hover:bg-[#24292e]",
      textColor: "text-white",
    },
    {
      name: "Xing",
      url: "https://www.xing.com/profile/Abdullah_Rather",
      description: "German professional network",
      icon: (
        <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 90 90'>
          <path d='M 13.677 17.774 c -0.782 0 -1.44 0.274 -1.77 0.811 c -0.342 0.555 -0.289 1.269 0.074 1.991 l 8.776 15.193 c 0.015 0.029 0.015 0.047 0 0.074 L 6.966 60.181 c -0.36 0.717 -0.342 1.437 0 1.991 c 0.33 0.534 0.915 0.885 1.696 0.885 h 12.98 c 1.941 0 2.876 -1.31 3.54 -2.508 c 0 0 13.488 -23.854 14.013 -24.78 c -0.053 -0.086 -8.924 -15.561 -8.924 -15.561 c -0.646 -1.151 -1.623 -2.434 -3.614 -2.434 H 13.677 z' />
          <path d='M 68.208 0 c -1.938 0 -2.779 1.221 -3.475 2.472 c 0 0 -27.963 49.59 -28.884 51.219 c 0.047 0.089 18.444 33.837 18.444 33.837 C 54.936 88.678 55.93 90 57.919 90 h 12.966 c 0.782 0 1.392 -0.295 1.723 -0.829 c 0.345 -0.555 0.336 -1.286 -0.027 -2.006 L 54.281 53.732 c -0.018 -0.027 -0.018 -0.059 0 -0.085 L 83.02 2.832 c 0.36 -0.717 0.369 -1.449 0.027 -2.003 C 82.717 0.295 82.103 0 81.321 0 H 68.208 z' />
        </svg>
      ),
      color: "bg-[#026466] hover:bg-[#014a4c]",
      textColor: "text-white",
    },
    {
      name: "Email",
      url: "mailto:abdullahrather19@gmail.com",
      description: "Direct professional contact",
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      ),
      color: "bg-[#ea4335] hover:bg-[#d23924]",
      textColor: "text-white",
    },
  ];

  // Modal handlers
  const openProfileModal = () => {
    setIsProfileModalOpen(true);

    // Enhanced scroll prevention
    const scrollY = window.scrollY || window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  };

  const closeProfileModal = () => {
    // Restore scroll position
    const savedY = parseInt(document.body.style.top || "0", 10) * -1;
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    window.scrollTo(0, savedY);
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "";
    });

    setIsProfileModalOpen(false);
  };

  // 🔥 NEW: Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isProfileModalOpen) {
        closeProfileModal();
      }
    };

    if (isProfileModalOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileModalOpen]);

  // 🔥 NEW: Modal scroll prevention - Same as Projects
  useEffect(() => {
    if (!isProfileModalOpen) return;
    const modalBody = document.querySelector(".modal-body");
    if (!modalBody) return;

    const stop = (e) => e.stopPropagation();
    modalBody.addEventListener("wheel", stop, { passive: false });

    return () => {
      modalBody.removeEventListener("wheel", stop);
    };
  }, [isProfileModalOpen]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Mobile detection
    const isMobile = window.innerWidth <= 768;

    // 🔥 ADD: About title animation (replacing motion)
    gsap.to("#aboutTitle", {
      scrollTrigger: {
        trigger: "#aboutTitle",
        start: isMobile ? "top 95%" : "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 0.4,
    });

    // 🎯 KEEP: About description typing effect
    const aboutDescription = document.getElementById("aboutDescription");
    if (aboutDescription) {
      gsap.set(aboutDescription, { opacity: 1 });

      gsap.to(aboutDescription, {
        scrollTrigger: {
          trigger: aboutDescription,
          start: isMobile ? "top 95%" : "top 90%",
        },
        delay: 0.1,
        text: {
          value:
            "Full-Stack Software Engineer with 5+ years of experience designing and implementing enterprise solutions. Currently pursuing M.Sc. in Artificial Intelligence in Germany.",
          delimiter: "",
        },
        duration: isMobile ? 1.0 : 1.5,
        ease: "none",
      });
    }

    // 🔥 ADD: Left content animation (replacing motion)
    gsap.to(".about-content-left", {
      scrollTrigger: {
        trigger: ".about-content-left",
        start: isMobile ? "top 95%" : "top 90%",
      },
      opacity: 1,
      x: 0,
      duration: 0.4,
    });

    // 🔥 ADD: Skills section animation (replacing motion)
    gsap.to(".skills-section", {
      scrollTrigger: {
        trigger: ".skills-section",
        start: isMobile ? "top 95%" : "top 90%",
      },
      opacity: 1,
      x: 0,
      duration: 0.4,
    });

    // 🔥 ENHANCED: Progress bars with animated percentages
    gsap.utils.toArray(".skill-progress-bar").forEach((bar, index) => {
      const skillLevel = skills[index].level;
      const percentageElement =
        bar.parentElement.parentElement.querySelector(".skill-percentage");

      // Set initial state
      gsap.set(bar, { width: "0%" });
      if (percentageElement) {
        percentageElement.textContent = "0%";
      }

      // Animate with ScrollTrigger
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: isMobile ? "top 95%" : "top 85%",
          toggleActions: "play none none reverse", // 🔥 This makes it reverse on scroll up
          refreshPriority: -1,
        },
        width: `${skillLevel}%`,
        duration: 1.2,
        delay: index * 0.1,
        ease: "power2.out",
        onUpdate: function () {
          if (percentageElement) {
            const progress = this.progress();
            const currentValue = Math.round(progress * skillLevel);
            percentageElement.textContent = `${currentValue}%`;
          }
        },
        onComplete: function () {
          // 🔥 NEW: Animate skill badge when progress completes
          const skillBadge =
            bar.parentElement.parentElement.querySelector(".skill-badge");
          if (skillBadge) {
            gsap.to(skillBadge, {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
            });
          }
        },
        // 🔥 NEW: Hide badge when animation reverses (scroll up)
        onReverseComplete: function () {
          const skillBadge =
            bar.parentElement.parentElement.querySelector(".skill-badge");
          if (skillBadge) {
            gsap.set(skillBadge, {
              opacity: 0,
              x: 20, // Reset to initial position
            });
          }
        },
      });

      // 🔥 NEW: Animate skill icons
      const skillIcon =
        bar.parentElement.parentElement.querySelector(".skill-icon");
      if (skillIcon) {
        gsap.to(skillIcon, {
          scrollTrigger: {
            trigger: bar,
            start: isMobile ? "top 95%" : "top 85%",
          },
          y: -3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2,
        });
      }
    });

    // 🔥 NEW: Animated stats counters
    gsap.utils.toArray(".stats-card").forEach((card, index) => {
      const stat = stats[index];
      const numberElement = card.querySelector(".stat-number");

      // Set initial state
      if (numberElement) {
        numberElement.textContent = "0" + stat.suffix;
      }

      // Animate counter with ScrollTrigger
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: card,
            start: isMobile ? "top 95%" : "top 90%",
            toggleActions: "play none none reverse",
          },
          duration: 1.5,
          delay: index * 0.1,
          ease: "power2.out",
          onUpdate: function () {
            if (numberElement) {
              const progress = this.progress();
              const currentValue = Math.round(progress * stat.targetValue);
              numberElement.textContent = currentValue + stat.suffix;
            }
          },
        }
      );
    });

    // 🔥 FIXED: Text reveal animation with consistent reveal/unreveal behavior
    const textReveal = document.querySelector("#aboutTextReveal");
    if (textReveal) {
      // Set initial state
      gsap.set("#aboutTextReveal", { opacity: 1, y: 0 });

      const words = textReveal.querySelectorAll("span");
      const totalWords = words.length;

      // 🔥 FIX: Create consistent reveal/unreveal animation
      ScrollTrigger.create({
        trigger: ".text-reveal-container",
        start: "top 80%", // Start revealing when 80% from top
        end: "bottom 20%", // Continue until 20% from bottom
        scrub: 1, // 🔥 IMPORTANT: This makes it smooth and consistent
        onUpdate: (self) => {
          const progress = self.progress;
          const wordIndex = Math.round(progress * totalWords);

          words.forEach((word, i) => {
            if (i < wordIndex) {
              word.classList.add("text-reveal-visible");
            } else {
              word.classList.remove("text-reveal-visible");
            }
          });
        },
        refreshPriority: 0, // Normal priority
        markers: false,
      });
    }

    // Stats cards - show immediately
    gsap.set(".stats-card", { opacity: 1, y: 0 });
    gsap.utils.toArray(".stats-card").forEach((card) => {
      card.classList.add("animation-complete");
    });

    // 🔥 IMPORTANT: Refresh ScrollTrigger after a short delay to handle page load scenarios
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [skills, stats]);

  return (
    <>
      {/* About Section */}
      <section
        id='about'
        className='py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900'
      >
        <div className='container mx-auto px-6'>
          {/* 🔥 NEW: Animated Avatar - Above heading */}
          {/* 🔥 ENHANCED: Hero-style About Header */}
          <div className='relative mb-20'>
            {/* Background Elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-10 left-10 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-xl opacity-60'></div>
              <div className='absolute bottom-10 right-10 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-full blur-xl opacity-60'></div>
            </div>

            {/* Main Content */}
            <div className='relative text-center'>
              {/* 🔥 ENHANCED: Clickable avatar for professional profiles */}
              <div
                className='profile-avatar-large relative inline-block mb-8 cursor-pointer group'
                onClick={openProfileModal}
                title='View Professional Profiles'
              >
                <div className='w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-purple-100 dark:from-indigo-900 dark:via-purple-900 dark:to-purple-800 p-2 shadow-2xl mx-auto transition-all duration-300 group-hover:shadow-3xl'>
                  <div className='w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800 ring-4 ring-white/50 dark:ring-slate-700/50 group-hover:ring-indigo-300 dark:group-hover:ring-indigo-600 transition-all duration-300'>
                    <img
                      src='/images/profile-avatar.png'
                      alt='Abdullah Rather'
                      className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className='w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold'
                      style={{ display: "none" }}
                    >
                      AR
                    </div>
                  </div>

                  {/* 🔥 NEW: Click indicator overlay */}
                  <div className='absolute inset-0 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-all duration-300 flex items-center justify-center'>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full p-2'>
                      <svg
                        className='w-6 h-6 text-indigo-600 dark:text-indigo-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* 🔥 ENHANCED: Larger status indicator with pulse */}
                <div className='profile-status absolute bottom-2 right-2 md:bottom-4 md:right-4'>
                  <div className='relative'>
                    <div className='w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-800'></div>
                    <div className='absolute inset-0 w-6 h-6 bg-green-400 rounded-full animate-ping opacity-75'></div>
                  </div>
                </div>

                {/* 🔥 NEW: Floating particles around avatar */}
                <div className='absolute -inset-4 pointer-events-none'>
                  <div
                    className='absolute top-4 left-4 w-2 h-2 bg-indigo-400 rounded-full animate-bounce'
                    style={{ animationDelay: "0s", animationDuration: "2s" }}
                  ></div>
                  <div
                    className='absolute top-8 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce'
                    style={{
                      animationDelay: "0.5s",
                      animationDuration: "2.5s",
                    }}
                  ></div>
                  <div
                    className='absolute bottom-8 left-8 w-1 h-1 bg-indigo-300 rounded-full animate-bounce'
                    style={{ animationDelay: "1s", animationDuration: "3s" }}
                  ></div>
                  <div
                    className='absolute bottom-4 right-12 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce'
                    style={{
                      animationDelay: "1.5s",
                      animationDuration: "2.8s",
                    }}
                  ></div>
                </div>
              </div>

              {/* 🔥 ENHANCED: Larger, more prominent title */}
              <div className='space-y-6'>
                <h2
                  id='aboutTitle'
                  className='text-5xl md:text-6xl font-extrabold mb-6 opacity-0 transform translate-y-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-100 dark:to-white bg-clip-text text-transparent'
                >
                  About Me
                </h2>

                {/* 🔥 ENHANCED: Styled description with better typography */}
                <div className='max-w-4xl mx-auto'>
                  <p
                    id='aboutDescription'
                    className='text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium'
                  ></p>
                </div>

                {/* 🔥 NEW: Professional badges */}
                <div className='flex flex-wrap justify-center gap-3 mt-8'>
                  <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200'>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    5+ Years Experience
                  </span>
                  <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
                    </svg>
                    M.Sc. AI Student
                  </span>
                  <span className='inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200'>
                    <svg
                      className='w-4 h-4 mr-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Based in Germany
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='grid md:grid-cols-2 gap-12 items-center'>
            {/* 🔥 REPLACE: motion.div with regular div + GSAP animations */}
            <div className='about-content-left opacity-0 transform translate-x-[-30px]'>
              <h3 className='text-2xl font-bold mb-6'>My Journey</h3>
              <p className='text-slate-600 dark:text-slate-300 mb-4'>
                I'm a passionate Full-Stack Software Engineer specializing in
                PHP (Laravel, Yii Framework), JavaScript (React, Node.js), and
                Python (Flask, FastAPI). My expertise spans enterprise
                management systems, educational platforms, and complex API
                integrations including DATEV for German accounting standards.
              </p>
              <p className='text-slate-600 dark:text-slate-300 mb-6'>
                Currently working as a Full-Stack Software Engineer in Germany
                while pursuing my Master's in Artificial Intelligence. I have
                led teams of 5+ developers and delivered high-quality solutions
                across diverse domains with comprehensive documentation and
                training.
              </p>

              {/* 🔥 ENHANCED: Stats with animated counters */}
              <div className='grid grid-cols-2 gap-4'>
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className='stats-card group text-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-lg shadow-lg backdrop-blur ring-1 ring-white/20 dark:ring-slate-700/20 transition-all duration-300 hover:bg-slate-100/80 dark:hover:bg-slate-700/60 hover:shadow-xl hover:scale-105 cursor-pointer'
                  >
                    <div className='stat-number text-2xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300'>
                      {/* 🔥 NEW: This will be animated */}0{stat.suffix}
                    </div>
                    <div className='text-slate-600 dark:text-slate-300 text-sm group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300'>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔥 REPLACE: motion.div with regular div + GSAP animations */}
            <div className='skills-section opacity-0 transform translate-x-[30px]'>
              <h3 className='text-2xl font-bold mb-6'>
                Major Technical Skills
              </h3>
              <div className='space-y-4'>
                {skills.map((skill, index) => (
                  <div key={index} className='skill-item'>
                    <div className='flex justify-between items-center mb-2'>
                      <div className='flex items-center space-x-3'>
                        {/* 🔥 NEW: Animated skill icon */}
                        <div className='skill-icon-container text-indigo-600 dark:text-indigo-400'>
                          {skill.icon}
                        </div>
                        <span className='font-medium'>{skill.name}</span>
                      </div>
                      <div className='flex items-center space-x-2'>
                        {/* 🔥 NEW: Skill level badge */}
                        <span className='skill-badge opacity-0 px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white'>
                          {skill.level >= 90
                            ? "Expert"
                            : skill.level >= 80
                            ? "Advanced"
                            : "Intermediate"}
                        </span>
                        <span className='skill-percentage text-slate-600 dark:text-slate-300'>
                          0%
                        </span>
                      </div>
                    </div>
                    <div className='w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2'>
                      <div
                        className='skill-progress-bar bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full'
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className='relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 py-24'>
        <div className='max-w-5xl mx-auto px-6'>
          <div className='text-reveal-container'>
            <p
              id='aboutTextReveal'
              className='text-reveal text-3xl md:text-4xl font-medium leading-relaxed'
            >
              <span>I</span>&nbsp;<span>specialize</span>&nbsp;<span>in</span>{" "}
              <span>designing</span>&nbsp;
              <span>and</span>&nbsp;<span>implementing</span>{" "}
              <span>enterprise-grade</span>&nbsp;
              <span>software</span>&nbsp;<span>solutions</span>&nbsp;
              <span>that</span> <span>solve</span>&nbsp;
              <span>complex</span>&nbsp;<span>business</span>{" "}
              <span>challenges,</span>&nbsp;<span>combining</span>&nbsp;
              <span>modern</span>&nbsp;<span>development</span>{" "}
              <span>practices</span>&nbsp;<span>with</span>&nbsp;
              <span>AI</span>&nbsp;<span>technologies</span>&nbsp;
              <span>to</span> <span>deliver</span>&nbsp;
              <span>exceptional</span>&nbsp;<span>user</span>{" "}
              <span>experiences.</span>
            </p>
          </div>
        </div>
      </section>
      {/* 🔥 ENHANCED: Professional Profiles Modal - Same structure as Projects */}
      {isProfileModalOpen && (
        <div
          className='modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm'
          onClick={closeProfileModal}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          <div
            className='bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className='flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-800 p-1'>
                  <img
                    src='/images/profile-avatar.png'
                    alt='Abdullah Rather'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                    Professional Profiles
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300 text-sm'>
                    Connect with me on various platforms
                  </p>
                </div>
              </div>
              <button
                onClick={closeProfileModal}
                className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors'
              >
                <svg
                  className='h-6 w-6 text-slate-600 dark:text-slate-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className='overflow-y-auto max-h-[calc(90vh-140px)] modal-body'>
              <div className='p-6'>
                <div className='grid gap-4'>
                  {professionalProfiles.map((profile, index) => (
                    <a
                      key={index}
                      href={profile.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`group flex items-center p-4 rounded-xl transition-all duration-300 ${profile.color} ${profile.textColor} hover:scale-105 hover:shadow-lg transform`}
                    >
                      <div className='flex-shrink-0 mr-4'>{profile.icon}</div>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold mb-1'>
                          {profile.name}
                        </h3>
                        <p className='text-sm opacity-90'>
                          {profile.description}
                        </p>
                      </div>
                      <div className='flex-shrink-0 ml-4'>
                        <svg
                          className='w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                          />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Additional Info */}
                <div className='mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl'>
                  <div className='flex items-start space-x-3'>
                    <svg
                      className='w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>
                        Let's Connect!
                      </h4>
                      <p className='text-sm text-slate-600 dark:text-slate-300'>
                        I'm always open to discussing new opportunities,
                        collaborations, or just connecting with fellow
                        developers. Feel free to reach out through any of these
                        platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
