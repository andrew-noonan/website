import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Mail, Linkedin, ExternalLink } from "lucide-react";
const base = import.meta.env.BASE_URL;
// Project detail component
// Update the ProjectDetail component to handle the new content structure
const ProjectDetail = ({ project, onBack }) => (
  <div className="max-w-4xl mx-auto p-6">
    <button 
      onClick={onBack}
      className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
    >
      ← Back to Projects
    </button>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.categories.map(category => (
            <span key={category} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {category} 
            </span>
          ))}
        </div>
        {project.ongoing && (
          <span className="inline-flex items-center text-sm text-emerald-600">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
            Ongoing Project
          </span>
        )}
      </div>
      {project.github && (
        <a href={project.github} className="text-gray-600 hover:text-gray-900">
          <Github className="h-5 w-5" />
        </a>
      )}
    </div>
    <div className="grid gap-8">
      {project.content?.map((item, idx) => {
  if (item.type === "paragraph") {
        return (
          <p
            key={idx}
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        );
      }
    else if (item.type === "image") {
          const sizeClasses = {
            small: "max-w-[200px]",
            medium: "max-w-[300px]",
            large: "max-w-[600px]",
            // Add more sizes as needed
          };
        
          return (
            <div key={idx} className="flex flex-col items-center space-y-2">
              <img 
                src={item.src}
                alt={item.caption || `${project.title} image ${idx}`}
                className={`rounded-lg shadow-md w-full ${item.src.includes('policybot.gif') ? 'max-w-[800px]' : sizeClasses[item.size] || sizeClasses.large}`}
              />
              {item.caption && (
                <p className="text-sm text-gray-500 italic max-w-[600px]">
                  {item.caption}
                </p>
              )}
            </div>
          );
        } else if (item.type === "image-row") {
          return (
            <div key={idx} className="grid grid-cols-2 gap-4">
              {item.images.map((image, imageIdx) => (
                <div key={imageIdx} className="flex flex-col items-center space-y-2">
                  <img 
                    src={image.src}
                    alt={image.caption || `${project.title} image ${imageIdx + 1}`}
                    className="rounded-lg shadow-md w-full"
                  />
                  {image.caption && (
                    <p className="text-sm text-gray-500 italic">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          );
        }
      })}
    </div>
  </div>
);

// Experience detail component
const ExperienceDetail = ({ experience, onBack }) => (
  <div className="max-w-4xl mx-auto p-6">
    <button 
      onClick={onBack}
      className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2"
    >
      ← Back to Experience
    </button>
    <h1 className="text-3xl font-bold mb-2">{experience.title}</h1>
    <p className="text-gray-600 mb-4">{experience.company} • {experience.period}</p>
    <div className="prose max-w-none">
      {experience.description}
      <h3>Key Achievements</h3>
      <ul>
        {experience.achievements.map((achievement, idx) => (
          <li key={idx}>{achievement}</li>
        ))}
      </ul>
    </div>
  </div>
);

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("about");

  const categories = [
    "Fluid Systems",
    "Computer Aided Machining",
    "Instrumentation/Electrical",
    "Rocketry",
    "MATLAB",
    "Python",
    "LabVIEW",
    "C/C++",
    "Leadership",
    "Mechanical Design"
    ];
  const aboutContent = [
    {
      type: "paragraph",
      text:  `
      
      I'm currently working as a research assistant with my BS (May 2023) and MS (June 2025) in Mechanical 
      Engineering from Vanderbilt University. My research projects have spanned experimental fluid 
      mechanics, diesel engine lubricant measurement, structural health monitoring of composite materials, and aerospace engineering. 
      I'm extremely grateful for these incredible opportunities to build my strengths in fluid systems 
      design, hardware design, data-driven analysis, manufacturing, and instrumentation.
  
      `.trim()
    },
    {type: "paragraph",
      text: `

      My thesis work focused on the generation and analysis of microbubbles in using 
      Venturi-based injectors, particularly the roles that fluid viscosity and
      surface tension play in bubble fragmentation. After designing and machining various 
      Venturi injectors in-house, I tested them on a modified benchtop experimental facility 
      with precise temperature and flow control using viscous silicone-based oils (PDMS). 
      I am motivated by data-driven and physics-based approaches, leveraging MATLAB, Python, and AI Image segmentation  
      to perform all of the analysis and derive new nondimensional models for bubble fragmentation.

      `.trim()

    },
    {
      type: "paragraph",
      text: `Besides work, I love spending time with my friends and family, cooking/eating, traveling, running, and time outdoors.`.trim()
    },
    {
      type: "image-row",
      images: [
        {
          src: "about/img1.jpg",
          caption: "Family"
        },
        {
          src: "about/img2.JPG",
          caption: "El Cajas, Ecuador"
        },
        {
          src: "about/img3.jpg",
          caption:"NASA USLI"
        }
      ]
    }
  ];

  const projects = [
    // Venturi Project
    {
      id: 1,
      title: "Thesis: Venturi Microbubble Generation",
      previewImage: "/projects/venturi/bubbles.gif",
      preview: "Design, manufacturing, and characterization of Venturi air injectors in viscous fluids",
      ongoing: true,
      // github: "https://github.com/nshehadeh/policy-bot",
      content: [
        {
          type: "paragraph",
          text: `
            My thesis explores the generation of microbubbles using Venturi injectors within 
            viscous fluids, motivated by applications in nuclear systems, water treatment, 
            and chemical processing. The study addresses gaps in existing knowledge by 
            systematically varying fluid viscosity and surface tension through a temperature-controlled 
            fluid (50 cSt polydimethylsiloxane, PDMS). Both dimensional and nondimensional analysis was then used to examine the role of
             flow velocity, viscosity, surface tension, and diverging angle on bubble fragmentation.

          `.trim()        
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/venturi/1 - VenturiSchematic.jpg", 
              caption: "Working principle of Venturi Microbubble Generators"
            },
            {
              src: "/projects/venturi/bubbles.gif",
              caption: "Sample Video with in-focus Bubble Detection"
            }
          ]
        },
        {
          type: "paragraph",
          text: `

            A specialized experimental facility was designed for this study with precise control over fluid 
            temperature and air and liquid flow rates. Venturi microbubble generators with diverging half-angles 
            of 7°, 15°, and 30° were designed and fabricated in-house using CNC machining.
            High speed imaging was then used to capture freshly generated bubbles, while pressure and temperature
            of the working fluid were precisely measured using a custom-built circuit and LabVIEW interface.

            `.trim()
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/venturi/2 - FacilityBasic.jpg",
              caption: "Experimental Facility for oil circulation, air injection, and imaging"
            },
            {
              src: "/projects/venturi/2 - ImageSetup.png",
              caption: "Venturi Nozzle and Imaging Setup"
            }
          ]
        },
        {
          type: "paragraph",
          text: `
            To extract quantitative data from high-speed video, data processing involved various image 
            analysis techniques. A traditional computer-vision approach was implemented in a custom MATLAB 
            interface and included median image subtraction, Canny edge detection, watershed segmentation, 
            and circular Hough transforms. A second approach was then used after
            completion of the thesis utilizing a custom implementation of Meta's SAM2 model which has been refined for 
            speed and accuracy in this particular task.
            `.trim()
        },
        {
          type: "paragraph",
          text: `
            Smaller and more uniform bubble sizes were measured at higher flow rates and lower viscosities,
            consistent with existing Reynolds number based models in literature. The key insight of this work,
            however, was to highlight the diminished role of viscosity. Bubble fragmentation is captured 
            much more strongly through the Weber number, which can be understood as the ratio of of flow energy 
            to surface tension energy of the dispersed bubbles. Ongoing work is focused on extending this model to a 
            lower viscosity fluids and creating a more universal trend. Additional information can be found in my thesis,
            linked at the top of this page for download.
            `.trim()
        },
        {
          type: "image",
          src: "/projects/venturi/4 - ReynoldsGroup.jpg",
          caption: "Normalized bubble diameter vs Reynolds number with inviscid data"
        },
        {
          type: "image",
          src: "/projects/venturi/4 - WeberDual.jpg",
          caption: "Normalized bubble diameter vs Weber number with inviscid data"
        }
      ],
      categories: ["Fluid Systems", 
                  "Computer Aided Machining", 
                  "Instrumentation/Electrical", 
                  "MATLAB", 
                  "Python", 
                  "LabVIEW"]
    },

    // USLI Project
    {
      id: 9,
      title: "Team President: NASA Student Launch 2023",
      preview: "Led team of ten to 3rd place overall in NASA's University Student Launch Initiative (USLI)",
      ongoing: false,
      github: null, // Add if available
      previewImage: "/projects/USLI/ExtendedReorientation.gif",
      content: [
        {
          type: "image",
          src: "/projects/USLI/MissionOverview.png",
          caption: "Mission overview for remote-controlled imaging system post-landing"
        },
        {
          type: "paragraph",
          text: `

          As team president and project manager of our NASA Student Launch Initiative (USLI) team, 
          I led a group of ten junior and senior engineering students (seven 
          mechanical engineers and three electrical engineers) in developing an innovative rocket-based 
          remote imaging system. The declared challenge was to design, build, and fly a rocket capable of 
          receiving RF commands transmitted by NASA to remotely control a camera system 
          that can image a full 360 degrees post-landing.

          `.trim()
        },
        {
          type: "paragraph",
          text: `

            Our rocket featured several novel subsystems, carefully designed to reliably achieve mission goals. 
            During ascent, the secondary payload (Active Apogee Control) delivered us to within 1m of our target 
            altitude. During descent, passive legs deployed to allow the rocket to land 
            horizontally, supported  by both legs and fins. Post-landing, the parachute was detached to prevent 
            dragging, the central payload bay rotated to orient the primary camera skyward, and the novel lift 
            system extended the camera and primary antenna upwards approximately 24 inches. After receiving radio 
            commands via APRS packets, the camera nacelle autonomously leveled and allowed full 
            360-degree rotation for imaging. This design maximized antenna clearance from ground interference 
            and positioned the camera above obstacles near the ground. 

           `.trim()
        },
        {
          type: "image",
          src: "/projects/USLI/Subsystem Overview.png",
          caption: "Overview of key subsystems for the payload mission"
        },
        {
          type: "paragraph",
          text: `
          
            Subsystem integration was critical, and every member contributed and collaborated broadly 
            to ensure reliable operation. The design of bulkheads, carbon-fiber airframes, custom PCBs, 
            3D-printed elements, and payload scaffolding was guided by load path analysis, FEA, field testing, 
            state machine modeling, and RF analysis. Using a combination of traditional machining, CNC machining,
            3D printing, laser cutting, and composite layup, our team of ten manufactured every component in-house. 
            
          `
        },
        {
          type: "image",
          src: "/projects/USLI/Manufacturing.png",
          caption: "CAD of the launch vehicle along with manufactured components and as-built rocket on the pad"
        },
        {
          type: "paragraph",
          text: `
          
            Rigorous testing was essential for project success and included load frame testing of 
            structural components, deployment tests, and subscale flights. Extensive integrated testing 
            then validated the lift mechanism, rotating camera bay, RF and imaging systems. In addition to aiding
            in the analysis, design, manufacturing, and testing of subsystems, my role encompassed budget and 
            timeline adherence, requirements derivation, and launch safety/recovery operations involving motor 
            loading and parachute deployment.

          `
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/USLI/Lift2.gif",
              caption: "Collapsable lift mechanism for camera and primary antenna"
            },
            {
              src: "/projects/USLI/Nacelle Demo.gif",
              caption: "Rotating camera nacelle for 360 degree imaging"
            }
          ]
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/USLI/ExtendedReorientation.gif",
              caption: "Testing of rotating camera bay with maximum torque (fully extended lift)"
            },
            {
              src: "/projects/USLI/DrogueDeployment.gif",
              caption: "Drogue parachute deployment and passive leg deployment"
            }
          ]
        },
        {
          type: "paragraph",
          text: `
          
            Our team's efforts culminated in 3rd place overall at the NASA competition among more than 50 
            competing teams <a href="https://www.nasa.gov/news-release/nasa-names-winners-of-2023-student-rocket-launch-competition/" target="_blank">(Link)</a>
            , and we earned 1st place for both altitude accuracy and STEM outreach initiatives 
            conducted across the country. This experience deepened my engineering expertise, emphasizing 
            interdisciplinary collaboration, design for manufacturability, and system integration. 
            Getting to lead and work with a team of such talented friends was an experience I am extremely grateful for,
            and I could not be more excited to see how everyone's careers develop! 
            Additional details and career outcomes can be explored further on our VADL team website <a href="https://www.vadl.org/copy-of-alumni-spotlight" target="_blank">(Link)</a>
            and project presentations/reports can be provided upon request.

          `
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/USLI/LandedPayload.png",
              caption: "Functional payload post-landing with original CAD rendering"
            },
            {
              src: "/projects/USLI/TeamPhoto.jpg",
              caption: "Team photo!"
            }
          ]
        },
      ],
      categories: [
        "Computer Aided Machining",
        "Mechanical Design",
        "Instrumentation/Electrical",
        "Rocketry",
        "Leadership",
        "C/C++"
        ]
    },

    // Payload Detachment System
    {
      id: 10,
      title: "Payload Detachment System",
      preview: "In-flight payload detachment system with radio and altitude control",
      previewImage: "/projects/PDS/AutorotateDrop.gif",
      //github: "https://github.com/nshehadeh/xrog",
      ongoing: false,
      content: [
        {
          type: "paragraph",
          text: `
            
            During my first year of graduate school, I served as the graduate mentor for the 2023-2024 NASA 
            USLI team. Their challenge was to safely detach and land a lander from a rocket at 400 feet without 
            using parachutes or energetics. The team's innovative solution was to integrate an in-house-built 
            coaxial drone into the rocket payload, which would autonomously or manually fly to safety after 
            detachment. This required precise altitude measurement synchronization with flight events.

            `.trim()
        },
        {
          type: "image",
          src: "/projects/PDS/Mission.png",
          caption: "USLI 2023-2024 Mission Overview, PDS shown in step 5"
        },
        {
          type: "paragraph",
          text: `
            
            To allow the team to focus on drone development, I was assigned responsibility for the 
            design, fabrication, and programming of the Payload Detachment System (PDS). 
            The system was required to receive remote Range Safety Officer (RSO) approval 
            via RF communication and only proceed with detachment once the rocket descended 
            below 400 feet. I developed the system around a Teensy 4.0 microcontroller for its ease of configuration, 
            high processing speed, and low power draw. This interfaced with a TBS Crossfire 
            RF system which was chosen for its proven reliability as a racing drone system, dual-antenna 
            redundancy, and proprietary frequency-hopping/handshake protocols, making it ideal for 
            the high-noise competition environment.

            `.trim()
        },
        {
          type: "image",
          src: "/projects/PDS/RemoteActuation.gif",
          caption: "Initial lab prototyping of RF controlled latches",
          size: "small"
        },
        {
          type: "paragraph",
          text: `
            
            The detachment mechanism was driven by compact Southco EM latches powered by a 12V source, which 
            satisfied mechanical strength and actuation speed requirements. A VectorNav VN-100 IMU provided high-fidelity 
            inertial and pressure measurements, enabling accurate altitude and flight event detection. 
            In less than a month, I rapidly prototyped and tested the system, achieving reliable transmission 
            out to 0.5 miles before handing off the finalized schematic to an undergraduate EE student for PCB 
            design. After receiving the custom board, I completed the assembly via surface-mount soldering and 
            integrated all subsystems into a fully functioning flight-ready unit, shown below.
            
            `.trim()
        },
        {
          type: "image",
          src: "/projects/PDS/PDS Assembled.png",
          caption: "Flight-ready PDS subsystem",
          size: "large"
        },
        {
          type: "paragraph",
          text: `
            
            The Teensy firmware was designed for autonomous decision-making and fault tolerance. 
            Upon power-up, the system verified IMU operation, SD card status, and power rail status, 
            communicating pass/fail results to the operator through LED indicators. It then zeroed 
            the pressure-based altitude and entered a launch wait state. Launch detection was defined as sustained 
            acceleration exceeding 3.5g for more than 0.5 seconds - a rolling average was used to avoid 
            false positives due to handling. After a motor-burn delay, the system waited for apogee 
            detection (defined as one second of no new altitude maximum) before scanning for RSO 
            approval via RF. If approval was received and the altitude was confirmed to be below 400 feet, 
            the Teensy issued the detachment signal to the EM latches, released the drone, and continued logging 
            flight data until detecting landing (five seconds without a new minimum altitude). An emergency 
            override switch on the transmitter provided an additional safeguard, allowing manual detachment 
            if onboard logic failed.
            
            `.trim()
        },
        {
          type: "image",
          src: "/projects/PDS/Software.png",
          caption: "High-level software schematic",
          size: "medium"
        },
        {
          type: "paragraph",
          text: `
            
            The system was rigorously tested and performed without fail during drone test flights, 
            preliminary rocket flights, and the final USLI competition, where it detached the drone 
            precisely at 400 feet following verified RSO approval. This successful PDS architecture has since 
            been adapted for other payloads, including an autonomous autorotation drone I was able to
            contribute to during the summer of 2024. 
            `.trim()
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/PDS/PDS Plot.png",
              caption: "Competition flight logs with autonomously detected flight events and successful actuation"
            },
            {
              src: "/projects/PDS/AutorotateDrop.gif",
              caption: "Repurposed PDS for deployment of autorotator from drone"
            }
          ]
        },
      ],
      categories:[
        "Computer Aided Machining",
        "Instrumentation/Electrical",
        "Rocketry",
        "C/C++",
        "Leadership",
        "Mechanical Design"
        ]
    },

    // Active APogee
    {
      id: 3,
      title: "Active Apogee Control",
      preview: "Contrastive learning for surgical skill assessment using surgical videos and robot kinematics",
      previewImage: "/projects/AAC/AACOnboard.gif",
      ongoing: false,
      github: "https://github.com/nshehadeh/contrastive-gesture-skill",
      content: [
        {
          type: "paragraph",
          text: `
            
            In the summer of 2022 (before senior year), I co-led a project titled Active Apogee Control as part 
            of my research assistantship in the Vanderbilt Aerospace Design Lab. Working alongside my peers 
            Matthew McGowan and Eric Holst, this was our first hands-on engineering project outside of 
            class. The challenge was to develop a system to improve the altitude accuracy of our 
            USLI rocket which heavily weighted metric in the competition scoring. Since target apogee is 
            selected months before flight and is based on early-stage mass predictions, teams historically missed 
            their target by an unacceptable margin due to changes in final vehicle design. Our goal 
            was to solve this by overpowering the motor and actively adjusting drag during flight, 
            enabling more precise control over apogee.

          `.trim(),
        },
        {
          type: "paragraph",
          text: `
          Instead of traditional deployable flat plate airbrakes, we pursued a novel and efficient approach which
          consisted of four small NACA 0012 airfoils that could independently rotate to adjust their 
          angle of attack, mounted just forward of the rocket's static fins. This design allowed for 
          continuous control over drag force without the need for mechanically complex or large deployment mechanisms. 
          Because the airfoils were located aft of the center of gravity but smaller than the primary fins, any detabilizing
          moments would be promptly corrected. Independent actuation was essential to minimize unintended 
          roll or pitch moments while modulating drag. A schematic of these aerodynamic principles is 
          shown in the figure below, and the airfoils were deployed in the drag configuration.

          `.trim()
        },
        {
          type: "image",
          src: "/projects/AAC/AAC Principle.png",
          caption: "Active Apogee Control working principle (middle)",
          size:"medium"
        },
        {
          type: "paragraph",
          text: `
          My primary contributions included prototyping of servo mounts, retrofitting the system into an older 
          launch vehicle for test flights, and writing the Raspberry Pi software (C++) that handled IMU input, 
          flight event detection, and airfoil deployment logic. Matthew developed a detailed simulation 
          architecture to fine-tuned the actuator deployment height(s) and meticulously iterated the electrical 
          design. Eric refined the mechanical design of airfoils and mounting hardware and performed 
          aerodynamic simulation to feed into flight models. As a team, we ensured that the system was 
          safe, responsive, and easily testable in both lab and flight environments.

          `.trim()
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/AAC/AAC Old.png",
              caption: "AAC Design for retrofit on old vehicle",
              size: "small"
            },
            {
              src: "/projects/AAC/AAC Isometric.png",
            caption: "AAC Redesign for competition, 2023"
            }
          ]
        },
        {
          type: "paragraph",
          text: `

          The inaugural flight test in August 2022 confirmed successful deployment, captured through on-board 
          video footage. However, a late-stage change led to flight data being lost, preventing thorough 
          analysis. We learned valuable lessons in system integration and 
          software testing, and the system was refined and successfully re-flown several times on our 2023 competition vehicle.
          The vehicle drag coefficient increased by about 50% with a 20-degree AoA, with no adverse pitching or rolling moments created 
          which would pose a safety risk as shown below

          `.trim()
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/AAC/AAC No Pitch Effect.png",
              caption: "Gyroscope data showing no adverse moments created during deployment",
              size: "small"
            },
            {
              src: "/projects/AAC/AAC Drag Coeff.png",
            caption: "Accelerometer-derived drag coefficient data "
            }
          ]
        },
        {
          type: "paragraph",
          text: `

          The active apogee control system ultimately helped our team place first in the Altitude Accuracy category 
          at NASA USLI <a href="https://engineering.vanderbilt.edu/2023/06/06/vanderbilt-rocket-team-collects-coveted-altitude-award-in-2023-nasa-student-launch-competition/" target="_blank">(Link)</a>, 
          reaching within 4 feet of our declared target apogee. Captured in-flight test footage is shown below.

          `.trim()
        },
        {
          type: "image",
          src: "/projects/AAC/AACOnboard.gif",
          caption: "On-board footage of 20-degree AAC deployment",
          size:"large"
        },
      ],
      categories: [
        "Rocketry",
        "C/C++",
        "Leadership",
        "Mechanical Design"
        ]
    },
    // Diesel Engine Lubricant Flow Estimation
    {
      id: 8,
      title: "Diesel Engine Lubricant Flow Estimation",
      preview: "In-situ estimation of lubricant flow rate on Diesel engine testbed using pressure and temperature measurements",
      ongoing: true,
      //github: "https://github.com/pkrobinette/suds-ecai-2023", // Add if available
      previewImage: "/projects/Engine/Engine.png",
      content: [
        {
          type: "paragraph",
          text: `
          
          Lubricant systems are a critical component of Diesel engine operation, responsible for reducing 
          friction, dissipating heat, and protecting engine components across a wide range of conditions. 
          Given their importance, these systems are often overdesigned to guarantee robustness, resulting in 
          efficiency losses that conflict with modern fuel economy and emissions standards. Accurate 
          modeling of engine lubrication flow is essential for improving system efficiency and is an active 
          subject of research, but it remains difficult due to limited access to in-engine flow data 
          and the complexities introduced by variable oil viscosity, geometry, relief valves, and 
          temperature gradients. My project addresses this key gap by developing a practical method to 
          estimate lubricant flow in a real engine using only temperature and pressure measurements and previously 
          characterized flow through the engine oil filter.

          `.trim()
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/Engine/Engine.png",
              caption: "Overview of the Diesel engine test facility"
            },
            {
              src: "/projects/Engine/Intercept.png",
              caption: "Lubricant flow intercept for pre-filter pressure measurement and validation"
            }
          ]
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/Engine/Schematic.png",
              caption: "Partial schematic of the lubricant flow system on the diesel engine"
            },
            {
              src: "/projects/Engine/3b.png",
              caption: "Modified filter housing for pressure sensing post-filter"
            }
          ]
        },
        {
          type: "paragraph",
          text: `
          
          Experiments were conducted on a 1.9 L Volkswagen TDI engine coupled to an eddy-current dynamometer. 
          The oil temperature and the pressure drop across a replaceable element oil filter was measured under varying RPM and 
          load conditions while maintaining stable oil temperatures. These measurements were then used in 
          conjunction with benchtop-derived friction factor and flow-pressure models <a href="https://www.sae.org/content/04-15-03-0012/" target="_blank">(Smith and Anilkumar)</a> to estimate lubricant 
          flow rate without direct flow instrumentation. 

            `.trim()
        },
        {
          type: "image",
          src: "/projects/Engine/Engine Run.png",
          caption: "Example Engine Run showing varied load/RPM conditions at approximately constant temperature",
          size: "large"
        },
        {
          type: "image",
          src: "/projects/Engine/P vs Q.png",
          caption: "Pressure drop vs flow rate as measured on the benchtop facility and temperature-dependence of the relationship",
          size: "large"
        },
        {
          type: "paragraph",
          text: `
          
          The estimated values showed excellent agreement with prior image velocimetry results on 
          the same testbed <a href="https://irbe.library.vanderbilt.edu/server/api/core/bitstreams/6b79d8ef-deb6-4547-9019-13e12a269483/content" target="_blank">(Schepner et al.)</a>, 
          validating the approach. The flow rate is largely temperature-independent for a given RPM, consistent
          with the gear pump operating principle, though the actuation of internal relief valves will be temperature 
          dependent due to increased system pressure. No internal relief valves were actuated at conditions of the 
          present study, so benchtop data is transferrable to this setup.

            `.trim()
        },
        {
          type: "image",
          src: "/projects/Engine/Flow Rate vs RPM.png",
          caption: "Pressure drop vs flow rate as measured on the benchtop facility and temperature-dependence of the relationship",
          size: "large"
        },
        {
          type: "paragraph",
          text: `
          
          This methodology offers a powerful alternative to traditional flow 
          measurement techniques, which often require significant modification to the engine block or 
          equipment that is impractical for real application. By using existing filter hardware and 
          accessible sensing points, it provides a minimally invasive approach to flow monitoring in operational engines. 
          This is particularly useful for validating lubrication models and identifying opportunities for 
          pump or system redesign aimed at improving overall engine efficiency. This work is ongoing, and we are
          currently in the process of fitting a flowmeter on the engine for validation of the model.

            `.trim()
        },
      ],
      categories: [
        "Fluid Systems",
        "Instrumentation/Electrical",
        "MATLAB",
        "LabVIEW",
        ]
    },

    // Structural Health Monitoring
    {
      id: 7,
      title: "Structural Health Monitoring with FBG's",
      preview: "Assistant Researcher on SHM coollaboration with NASA AFRC",
      previewImage: "/projects/SHM/Blast Test Setup.png",
      ongoing: false,
      github: "https://github.com/nshehadeh/ar_presence",
      content:[
        {
          type: "paragraph",
          text: `
          
          As a graduate research assistant, I supported an ongoing research initiative focused on developing 
          structural health monitoring criteria for composite materials in reusable launch vehicles using 
          Fiber Bragg Gratings (FBGs). The operating principle of FBGs is shown in the figure below, relying 
          on a characteristic Bragg Wavelength which results when periodic gratings of a different refractive index 
          are written into an optical fiber. The period of these gratings changes under both tensile and compressive strain,
          shifting the wavelength and allowing for precise strain measurement. FBGs differ from traditional resistive strain gages (RSGs) in several 
          key ways. They allow for multipoint sensing / multiplexing along a single fiber (enabling high spatial resolution), 
          are immune to electromagnetic interference (especially important in aerospace environments), and they greatly 
          reduce installation time and mass due to reduced wiring and signal processing circuitry. 

          `.trim()
        },
        {
          type: "image",
          src: "/projects/SHM/FBG Working Principle.png",
          caption: "Schematic illustrating the working principle and interrogation of FBG sensors"
        },
        {
          type: "paragraph",
          text: `
          In collaboration with the Fiber Optic Sensing System (FOSS) lab at NASA Armstrong Flight Research Center 
          (AFRC), our team sought to explore the application of FBGs in dynamic testing environments relevant to 
          reusable space vehicles. Overarching research goals include: validation of FBG strain measurements 
          (with RSGs as a comparator) in quasi-static, dynamic, and blast loading conditions, and 
          gathering of meaningful data that would support NASA's interest in raising the technology readiness 
          level of FBG systems for flight use.
          `.trim()
        },
        {
          type: "image",
          src: "/projects/SHM/DLF.jpg",
          caption: "Dynamic Load Frame test facility",
          size: "small"
        },
        {
          type: "image",
          src: "/projects/SHM/Blast Test Setup.png",
          caption: "Blast loading test facility",
          size: "large"
        },
        {
          type: "paragraph",
          text: `
          
          While the primary research and thesis work were led by Thomas Colicci, I played a key supporting 
          role throughout the project. I accompanied our team on three trips to NASA AFRC, where I received 
          hands-on training with their FOSS systems and collaborated with NASA engineers. I focused 
          on developing and refining the data analysis pipelines for both 5 kHz and 30 kHz systems. 
          This involved implementing robust peak wavelength tracking algorithms in 
          MATLAB to achieve microstrain-level resolution in challenging test environments. These methods 
          included adaptive center-of-mass estimation and thresholding techniques that account for artifacts 
          like intensity dropouts and peak aliasing—issues that are unique to optical sensing, particularly 
          in high strain-rate applications.

          `.trim()
        },
        {
          type: "image",
          src: "/projects/SHM/BasicFBG.png",
          caption: "FBG intensity-wavelength data for a moment in time. Tracking of these peaks over time yields material strain",
          size: "medium"
        },
        {
          type: "paragraph",
          text: `
          
          While the experimental and thesis work were led by Thomas Colicci, I played a key supporting 
          role throughout the project. I accompanied our team on three trips to NASA AFRC, where I collaborated 
          with NASA engineers for future flight-based design iterations and received 
          hands-on training with their layup process and FBG interrogation systems. I focused 
          on developing and refining the data analysis pipeline, particularly for dynamic strain 
          measurements. This involved implementing robust peak wavelength tracking algorithms in 
          MATLAB to achieve microstrain-level resolution in challenging test environments. These methods 
          included adaptive center-of-mass estimation and thresholding techniques that account for artifacts 
          like intensity dropouts and peak aliasing—issues that are unique to optical sensing, particularly 
          in high strain-rate applications.

          `.trim()
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/SHM/PeakDrop.gif",
              caption: "Example of minor intensity dips which occur during loading and cause a shifting of peak labels"
            },
            {
              src: "/projects/SHM/Aliasing.png",
              caption: "Peaks just prior to aliasing. If one sensor is in tension (rightward shift), and one is in compression (leftward shift), they can overlap"
            }
          ]
        },
        {
          type: "paragraph",
          text: `
          
          The FBGs performed exceptionally well under dynamic and blast loading, even in conditions 
          where partial fiber damage occurred, a scenario in which traditional RSGs would have 
          completely failed. Our comparative studies confirmed that FBGs could reliably track dynamic 
          strain with high fidelity and repeatability. As Thomas concluded his work and graduated, I helped 
          facilitate the handoff of responsibilities to Jonathan Zak, the new lead graduate researcher. 
          I supported Jonathan during an additional trip to NASA AFRC, where we acquired a new 
          30 kHz FBG interrogator to expand the scope of our dynamic testing and prepare for flight testing.

          `.trim()
        },
        {
          type: "image-row",
          images: [
            {
              src: "/projects/SHM/FBG_BlastLayout.png",
              caption: "Fiber and comparative RSG layout for blast test on carbon fiber cylinder"
            },
            {
              src: "/projects/SHM/4gBlast.png",
              caption: "Strain data from FBGs 1, 2, and 3 from the 4g blast test. RSG data was unusable due to high RF interference."
            }
          ]
        },
      ],
      categories: [
        "Instrumentation/Electrical",
        "MATLAB",
        "LabVIEW",
        "Leadership",
        "Mechanical Design"
        ]
    },
  ];

  const experiences = [
    {
      id: 0,
      title: "Software Engineer",
      company: "AviaryAI",
      period: "February 2025 - Present",
      preview: "Software engineer building AI voice agent tools for financial institutions",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "AI/ML/Backend engineer for voice agent and knowledge base platforms",
        "YC-backed startup based in NYC"
      ],
      companyLogo: "/experiences/aviary.png"

    },
    {
      id: 1,
      title: "Machine Learning Engineer Intern",
      company: "Accenture Federal Services (AFS)",
      period: "May 2022 - August 2022",
      preview: "Member of AFS's Machine Learning Research Division",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "Conducted research on the application and adaptation of emerging AI technologies for federal services",
        "Implemented CLIP-GEN to synthesize images to improve hotel classification in human trafficking photographs",
        "Used AWS EC2 for scalable data preprocessing and distributed multi-GPU training to reduce model training time",
        "Fine-tuned CLIP to learn latent state representations of hotel picture and location pairs using HuggingFace, resulting in 98% accuracy classifying hotel chains and the generation of basic synthetic images"
      ],
      companyLogo: "/experiences/afs-logo.jpg"
    },
    {
      id: 2,
      title: "VISE Researcher",
      company: "BEAM Lab, Vanderbilt University",
      period: "May 2021 - May 2022",
      preview: "Researcher in Biomedical Elasticity and Acoustic Measurement Lab",
      description: "Detailed description of the role and responsibilities...",
      achievements: [
        "Implemented a backend system and GUI to facilitate live ultrasound placement on patients",
        "Engineered an acoustic window detection algorithm using MATLAB, MEX, and CUDA (C) for efficient real-time ultrasound analysis on beamformed data",
        "Improved ultrasound image quality with UNET, achieving 15% average SNR gains on phantom RF data"
      ],
      companyLogo: "/experiences/vise-logo.png",
      projectLinks: [  // Optional array of related projects
        {
          id: 9,  // matches the id in your projects array
          label: "More Details on BEAM Lab Research"  // display name
        },
      ]
    }
  ];

  const filteredProjects = selectedCategories.length > 0
    ? projects.filter(project => 
        project.categories.some(category => 
          selectedCategories.includes(category)
        )
      )
    : projects;

  if (selectedProject) {
    return (
      <ProjectDetail 
        project={projects.find(p => p.id === selectedProject)} 
        onBack={() => {
          setSelectedProject(null);
          setActiveTab("projects"); // Set active tab back to projects
        }}
      />
    );
  }

  if (selectedExperience) {
    return (
      <ExperienceDetail
        experience={experiences.find(e => e.id === selectedExperience)}
        onBack={() => setSelectedExperience(null)}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-8">
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Andrew Noonan
            </h1>
          <p className="text-gray-600 mb-4">M.S. Mechanical Engineering</p>
            <div className="flex gap-4">
              <a href="mailto:andrew.p.noonan@vanderbilt.edu" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/andrew-noonan-413227202/" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <img 
            src="/profile/hs.png" 
            alt="Profile" 
            className="rounded-full w-32 h-32 border-4 border-white shadow-lg object-cover flex-shrink-0"  // Added object-cover and flex-shrink-0
            />
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto">
          <Tabs defaultValue={activeTab} className="w-full space-y-4">
            {/* Modified TabsList to prevent overflow */}
            <div className="w-full border-b">
            <TabsList className="h-auto flex flex-wrap bg-muted p-1">
              <TabsTrigger 
                value="about"
                className="flex-1 min-w-[120px]"
              >
                About
              </TabsTrigger>
              {/* <TabsTrigger 
                value="experience"
                className="flex-1 min-w-[120px]"
              >
                Experience
              </TabsTrigger> */}
              <TabsTrigger 
                value="projects"
                className="flex-1 min-w-[120px]"
              >
                Projects/Experience
              </TabsTrigger>
              <TabsTrigger 
                value="resume"
                className="flex-1 min-w-[120px]"
              >
                Resume
              </TabsTrigger>
              <TabsTrigger 
                value="thesis"
                className="flex-1 min-w-[120px]"
              >
                Thesis
              </TabsTrigger>
              {/* <TabsTrigger 
                value="blog"
                className="flex-1 min-w-[120px]"
              >
                Blog
              </TabsTrigger> */}
            </TabsList>
            </div>

            {/* About section with improved mobile image grid */}
            <TabsContent value="about">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">About Me</h2>
                  <div className="grid gap-8">
                    {aboutContent.map((item, idx) => {
                      if (item.type === "paragraph") {
                        return (
                          <p key={idx} className="text-gray-600 leading-relaxed">
                            {item.text}
                          </p>
                        );
                      }
                      else if (item.type === "image-row") {
                        return (
                          <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {item.images.map((image, imageIdx) => (
                              <div key={imageIdx} className="flex flex-col items-center">
                                <div className="w-full min-h-[200px] sm:min-h-[150px]">
                                  <img 
                                    src={image.src}
                                    alt={image.caption || `Image ${imageIdx + 1}`}
                                    className="rounded-lg shadow-md w-full h-full object-cover"
                                  />
                                </div>
                                {image.caption && (
                                  <p className="text-sm text-gray-500 italic mt-2 text-center">
                                    {image.caption}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        );
                      }
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
                <Card>
                    <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
                    <div className="grid gap-4">
                        {experiences.map((experience) => (
                        <div
                            key={experience.id}
                            className="text-left border p-4 rounded-lg hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex justify-between items-start">
                            <div className="flex-grow">
                                <h3 className="font-semibold">{experience.title}</h3>
                                <p className="text-sm text-gray-500">{experience.company} • {experience.period}</p>
                                <p className="mt-2 text-gray-600">{experience.preview}</p>
                                {experience.achievements && (
                                <ul className="mt-2 list-disc list-inside text-gray-600">
                                    {experience.achievements.map((achievement, idx) => (
                                    <li key={idx}>{achievement}</li>
                                    ))}
                                </ul>
                                )}
                                {experience.projectLinks && experience.projectLinks.length > 0 && (
                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-2">
                                    {experience.projectLinks.map((link) => (
                                        <button
                                        key={link.id}
                                        onClick={() => setSelectedProject(link.id)}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm transition-colors"
                                        >
                                        <span className="mr-1">→</span> {link.label}
                                        {link.tags && link.tags.map(tag => (
                                            <span key={tag} className="ml-1 text-xs bg-blue-100 px-2 py-0.5 rounded-full">
                                            {tag}
                                            </span>
                                        ))}
                                        </button>
                                    ))}
                                    </div>
                                </div>
                                )}
                            </div>
                            {experience.companyLogo && (
                                <img 
                                src={experience.companyLogo} 
                                alt={`${experience.company} logo`}
                                className="w-16 h-16 object-contain ml-4"
                                />
                            )}
                            </div>
                        </div>
                        ))}
                    </div>
                    </CardContent>
                </Card>
                </TabsContent>
                <TabsContent value="projects">
                    <Card>
                        <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold">Projects and Experience</h2>
                            <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Active
                            </div>
                        </div>

                        {/* Categories filter - keeping this */}
                        <div className="mb-6">
                            <div className="text-sm text-gray-600 mb-2">Filter by category:</div>
                            <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategories(prev =>
                                    prev.includes(category)
                                        ? prev.filter(c => c !== category)
                                        : [...prev, category]
                                    );
                                }}
                                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                    selectedCategories.includes(category)
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                >
                                {category}
                                </button>
                            ))}
                            </div>
                        </div>

                        {/* New Project Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredProjects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setSelectedProject(project.id)}
                                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 text-left"
                            >
                                {/* Project Preview Image or Placeholder */}
                                <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                {project.previewImage ? (
                                    <img 
                                    src={project.previewImage} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Visual placeholder based on category */}
                                    {project.categories[0] === "Machine Learning" && (
                                        <div className="text-3xl opacity-30">🤖</div>
                                    )}
                                    {project.categories[0] === "Mixed Reality" && (
                                        <div className="text-3xl opacity-30">🥽</div>
                                    )}
                                    {project.categories[0] === "LLMs" && (
                                        <div className="text-3xl opacity-30">💬</div>
                                    )}
                                    {/* Add more category icons as needed */}
                                    </div>
                                )}
                                {/* Ongoing badge if applicable */}
                                {project.ongoing && (
                                    <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                                    Active
                                    </div>
                                )}
                                </div>

                                {/* Project Info */}
                                <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                    </h3>
                                    {project.github && (
                                    <a 
                                        href={project.github}
                                        className="text-gray-400 hover:text-gray-600"
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <Github className="h-5 w-5" />
                                    </a>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {project.preview}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {project.categories.map(category => (
                                    <span 
                                        key={category} 
                                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                                    >
                                        {category}
                                    </span>
                                    ))}
                                </div>
                                </div>

                                {/* Interactive overlay hint */}
                                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                            </button>
                            ))}
                        </div>
                        </CardContent>
                    </Card>
                    </TabsContent>
            {/*<TabsContent value="projects">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Projects</h2>
                    <div className="flex items-center gap-2 text-sm text-emerald-600">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Current
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">Filter by category:</div>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategories(prev =>
                              prev.includes(category)
                                ? prev.filter(c => c !== category)
                                : [...prev, category]
                            );
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedCategories.includes(category)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {filteredProjects.map((project) => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project.id)}
                        className="text-left border p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{project.title}</h3>
                            {project.ongoing && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            )}
                          </div>
                          {project.github && (
                            <a 
                              href={project.github}
                              className="text-gray-600 hover:text-gray-900"
                              onClick={e => e.stopPropagation()}
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{project.preview}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map(category => (
                            <span key={category} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                              {category}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            */}
            <TabsContent value="resume">
                <Card>
                    <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div><h2 className="text-2xl font-semibold">Resume</h2>
                      <h5 className="text-sm text-red-500 underline underline-red-600 pt-2" >Not up to date</h5> </div>
                        
                        <a 
                        href="/resume/nishan-shehadeh-resume.pdf"
                        download
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                        <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                            />
                        </svg>
                        Download PDF
                        </a>
                    </div>
                    <div className="border rounded-lg overflow-hidden bg-gray-50">
                        <iframe
                        src="/resume/nishan-shehadeh-resume.pdf"
                        className="w-full h-[800px]"
                        title="Resume Preview"
                        />
                    </div>
                    </CardContent>
                </Card>
                </TabsContent>
            <TabsContent value="thesis">
                <Card>
                    <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <div><h2 className="text-2xl font-semibold">Thesis</h2>
                      <h5 className="text-sm text-red-500 underline underline-red-600 pt-2" >Not final yet</h5> </div>
                        
                        <a 
                        href="projects\venturi\Noonan Masters Thesis Draft 6_5_25.pdf"
                        download
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                        <svg 
                            className="w-4 h-4 mr-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                            />
                        </svg>
                        Download PDF
                        </a>
                    </div>
                    <div className="border rounded-lg overflow-hidden bg-gray-50">
                        <iframe
                        src="projects\venturi\Noonan Masters Thesis Draft 6_5_25.pdf"
                        className="w-full h-[800px]"
                        title="Thesis Preview"
                        />
                    </div>
                    </CardContent>
                </Card>
                </TabsContent>
            <TabsContent value="blog">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
                  <div className="grid gap-4">
                    <div className="border p-4 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-200">
                      <h3 className="font-semibold">Coming Soon</h3>
                      <p className="text-sm text-gray-500"></p>
                      <p className="text-gray-600"></p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

export default App;
