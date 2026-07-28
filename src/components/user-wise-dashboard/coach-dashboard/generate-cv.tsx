"use client";
import React, { useState, useEffect } from "react";
import {
  IconDownload,
  IconCircleCheck,
  IconPencil,
  IconUpload,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconPlus,
  IconMapPin,
  IconClock,
  IconPhone,
  IconMail,
  IconShield,
  IconShare,
  IconTrophy,
  IconBallFootball
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FullEditableCv from "@/app/(common)/cvs-page/coach-cv-details/components/FullEditableCv";
import { useCoach } from "@/lib/hooks/useCoach";
import { usePlayerStats } from "@/app/(common)/cvs-page/player-cv-details/components/FullEditablePage";
import { usePlayer } from "@/lib/hooks/usePlayer";
import { useRouter } from "next/navigation";
import { IconUserCheck } from "@tabler/icons-react";

const COUNTRY_CODES: Record<string, string> = {
  "afghanistan": "af", "albania": "al", "algeria": "dz", "andorra": "ad", "angola": "ao",
  "antigua and barbuda": "ag", "argentina": "ar", "armenia": "am", "australia": "au",
  "austria": "at", "azerbaijan": "az", "bahamas": "bs", "bahrain": "bh", "bangladesh": "bd",
  "barbados": "bb", "belarus": "by", "belgium": "be", "belize": "bz", "benin": "bj",
  "bhutan": "bt", "bolivia": "bo", "bosnia and herzegovina": "ba", "botswana": "bw",
  "brazil": "br", "brunei": "bn", "bulgaria": "bg", "burkina faso": "bf", "burundi": "bi",
  "cambodia": "kh", "cameroon": "cm", "canada": "ca", "cape verde": "cv",
  "central african republic": "cf", "chad": "td", "chile": "cl", "china": "cn",
  "colombia": "co", "comoros": "km", "congo": "cg", "costa rica": "cr", "croatia": "hr",
  "cuba": "cu", "cyprus": "cy", "czech republic": "cz", "denmark": "dk", "djibouti": "dj",
  "dominica": "dm", "dominican republic": "do", "ecuador": "ec", "egypt": "eg",
  "el salvador": "sv", "equatorial guinea": "gq", "eritrea": "er", "estonia": "ee",
  "ethiopia": "et", "fiji": "fj", "finland": "fi", "france": "fr", "gabon": "ga",
  "gambia": "gm", "georgia": "ge", "germany": "de", "ghana": "gh", "greece": "gr",
  "grenada": "gd", "guatemala": "gt", "guinea": "gn", "guinea-bissau": "gw",
  "guyana": "gy", "haiti": "ht", "honduras": "hn", "hungary": "hu", "iceland": "is",
  "india": "in", "indonesia": "id", "iran": "ir", "iraq": "iq", "ireland": "ie",
  "israel": "il", "italy": "it", "jamaica": "jm", "japan": "jp", "jordan": "jo",
  "kazakhstan": "kz", "kenya": "ke", "kiribati": "ki", "korea, north": "kp",
  "korea, south": "kr", "kuwait": "kw", "kyrgyzstan": "kg", "laos": "la", "latvia": "lv",
  "lebanon": "lb", "lesotho": "ls", "liberia": "lr", "libya": "ly", "liechtenstein": "li",
  "lithuania": "lt", "luxembourg": "lu", "macedonia": "mk", "madagascar": "mg",
  "malawi": "mw", "malaysia": "my", "maldives": "mv", "mali": "ml", "malta": "mt",
  "marshall islands": "mh", "mauritania": "mr", "mauritius": "mu", "mexico": "mx",
  "micronesia": "fm", "moldova": "md", "monaco": "mc", "mongolia": "mn", "montenegro": "me",
  "morocco": "ma", "mozambique": "mz", "myanmar": "mm", "namibia": "na", "nauru": "nr",
  "nepal": "np", "netherlands": "nl", "new zealand": "nz", "nicaragua": "ni",
  "niger": "ne", "nigeria": "ng", "norway": "no", "oman": "om", "pakistan": "pk",
  "palau": "pw", "panama": "pa", "papua new guinea": "pg", "paraguay": "py", "peru": "pe",
  "philippines": "ph", "poland": "pl", "portugal": "pt", "qatar": "qa", "romania": "ro",
  "russia": "ru", "rwanda": "rw", "saint kitts and nevis": "kn", "saint lucia": "lc",
  "saint vincent and the grenadines": "vc", "samoa": "ws", "san marino": "sm",
  "sao tome and principe": "st", "saudi arabia": "sa", "senegal": "sn", "serbia": "rs",
  "seychelles": "sc", "sierra leone": "sl", "singapore": "sg", "slovakia": "sk",
  "slovenia": "si", "solomon islands": "sb", "somalia": "so", "south africa": "za",
  "spain": "es", "sri lanka": "lk", "sudan": "sd", "suriname": "sr", "swaziland": "sz",
  "sweden": "se", "switzerland": "ch", "syria": "sy", "taiwan": "tw", "tajikistan": "tj",
  "tanzania": "tz", "thailand": "th", "timor-leste": "tl", "togo": "tg", "tonga": "to",
  "trinidad and tobago": "tt", "tunisia": "tn", "turkey": "tr", "turkmenistan": "tm",
  "tuvalu": "tv", "uganda": "ug", "ukraine": "ua", "united arab emirates": "ae",
  "united kingdom": "gb", "united states": "us", "uruguay": "uy", "uzbekistan": "uz",
  "vanuatu": "vu", "vatican city": "va", "venezuela": "ve", "vietnam": "vn", "yemen": "ye",
  "zambia": "zm", "zimbabwe": "zw"
};

const getFlagUrl = (countryName: string) => {
  if (!countryName) return "";
  const code = COUNTRY_CODES[countryName.toLowerCase()];
  if (!code) return "";
  return `https://flagcdn.com/w160/${code}.png`;
};

const pendingReports = [
  { id: 1, name: "Marcus Silva", position: "Forward", rating: 9.2, avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "David Chen", position: "Midfielder", rating: 8.8, avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Alex Jonson", position: "Defender", rating: 8.5, avatar: "https://i.pravatar.cc/150?u=3" },
];

const CareerItem = ({ logo, name, role, years, type }: { logo: string; name: string; role: string; years: string; type: string }) => (
  <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 group hover:border-white/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
        <img src={logo} alt={name} className="w-6 h-6 object-contain" />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-white truncate">{name}</h4>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{role}</p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-bold text-white/40">{years}</span>
      <span className="text-[10px] font-black text-[#E31B23] uppercase tracking-widest">{type}</span>
    </div>
  </div>
);

const GenerateCvCoach = () => {
  const router = useRouter();
  const { coachData } = useCoach();
  const { bioRating, skillsAvg, metricsAvg, attributesAvg } = usePlayerStats();
  const { players, selectPlayer } = usePlayer();
  const [role, setRole] = useState<string>("coach");

  const overallRating = 88;

  // Filter players who need validation
  const validationNeededPlayers = players.filter((player) => {
    return (
      player.validationStatus === "pending" ||
      player.validationStatus === "expired" ||
      player.requestedValidation ||
      (player.assignedMonthsAgo && player.assignedMonthsAgo >= 3 && player.validationStatus !== "verified")
    );
  }).slice(0, 3); // Display top 3 pending

  const getValidationReason = (player: any) => {
    if (player.requestedValidation) return "Requested";
    if (player.validationStatus === "expired") return "Expired";
    if (player.assignedMonthsAgo && player.assignedMonthsAgo >= 3) return "Assigned > 3M";
    return "Pending";
  };

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "coach";
    setRole(userRole);
  }, []);

  const generateProfessionalPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <html>
        <head>
          <title>Technical Coaching Profile</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
            body {
              font-family: 'Inter', sans-serif;
              color: #111;
              margin: 0;
              padding: 50px;
              line-height: 1.4;
              background: #fff;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 4px solid #E31B23;
              padding-bottom: 40px;
              margin-bottom: 50px;
            }
            .brand { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; color: #E31B23; margin-bottom: 10px; }
            .coach-name { font-size: 48px; font-weight: 900; text-transform: uppercase; letter-spacing: -2px; margin: 0; line-height: 1; }
            .coach-title { font-size: 16px; font-weight: 600; color: #666; margin-top: 5px; text-transform: uppercase; }
            
            .rating-circle {
              width: 100px;
              height: 100px;
              background: #111;
              color: #fff;
              border-radius: 50%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border: 4px solid #E31B23;
            }
            .rating-value { font-size: 36px; font-weight: 900; line-height: 1; }
            .rating-label { font-size: 10px; font-weight: 800; text-transform: uppercase; opacity: 0.6; }

            .main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
            .section { margin-bottom: 40px; }
            .section-header { 
              font-size: 14px; 
              font-weight: 900; 
              text-transform: uppercase; 
              letter-spacing: 2px; 
              color: #111;
              border-bottom: 2px solid #eee;
              padding-bottom: 8px;
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
            }
            
            .attribute-table { width: 100%; border-collapse: collapse; }
            .attribute-row { border-bottom: 1px solid #f0f0f0; }
            .attribute-cell { padding: 10px 0; font-size: 13px; }
            .attr-label { color: #666; font-weight: 600; }
            .attr-value { font-weight: 900; text-align: right; color: #111; }
            .attr-bar-bg { width: 60px; height: 6px; background: #eee; border-radius: 3px; display: inline-block; margin-left: 15px; position: relative; top: -2px; }
            .attr-bar-fill { height: 100%; background: #E31B23; border-radius: 3px; }

            .full-width { grid-column: span 2; }
            .highlight-box { background: #f9f9f9; padding: 25px; border-radius: 15px; border: 1px solid #eee; }
            
            .footer {
              margin-top: 80px;
              padding-top: 30px;
              border-top: 1px solid #eee;
              display: flex;
              justify-content: space-between;
              font-size: 10px;
              color: #999;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            @media print {
              body { padding: 0; }
              .no-print { display: none; }
              -webkit-print-color-adjust: exact;
            }
          </style>
        </head>
        <body oncontextmenu="return false;">
          <div class="header">
            <div>
              <div class="brand">Eddie Ricci Football Management</div>
              <h1 class="coach-name">Coach Profile</h1>
              <div class="coach-title">Professional Football Coach</div>
            </div>
            <div class="rating-circle">
              <span class="rating-label">Overall</span>
              <span class="rating-value">88</span>
            </div>
          </div>

          <div class="main-grid">
            <!-- Bio Section -->
            <div class="section">
              <div class="section-header">Professional Profile</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Experience</td><td class="attribute-cell attr-value">15+ Years</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Current Role</td><td class="attribute-cell attr-value">Head Coach</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Specialization</td><td class="attribute-cell attr-value">Tactical Analysis</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Nationality</td><td class="attribute-cell attr-value">Professional</td></tr>
              </table>
            </div>

            <!-- Performance Metrics -->
            <div class="section">
              <div class="section-header">Coaching Summary</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Trophies Won</td><td class="attribute-cell attr-value">5</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Teams Managed</td><td class="attribute-cell attr-value">8</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Win Rate</td><td class="attribute-cell attr-value">72%</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Contract Until</td><td class="attribute-cell attr-value">2026</td></tr>
              </table>
            </div>

            <!-- Technical Evaluation -->
            <div class="section">
              <div class="section-header">Coaching Attributes</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Tactical Awareness</td><td class="attribute-cell attr-value">92 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 92%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Man Management</td><td class="attribute-cell attr-value">88 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 88%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-row"><td class="attribute-cell attr-label">Leadership</td><td class="attribute-cell attr-value">85 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 85%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Innovation</td><td class="attribute-cell attr-value">80 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 80%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Communication</td><td class="attribute-cell attr-value">87 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 87%"></div></div></td></tr>
              </table>
            </div>

            <!-- Development Skills -->
            <div class="section">
              <div class="section-header">Development Skills</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Player Development</td><td class="attribute-cell attr-value">89 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 89%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Technical Training</td><td class="attribute-cell attr-value">86 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 86%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Physical Conditioning</td><td class="attribute-cell attr-value">84 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 84%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Mental Training</td><td class="attribute-cell attr-value">82 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 82%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Strategic Planning</td><td class="attribute-cell attr-value">90 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 90%"></div></div></td></tr>
              </table>
            </div>

            <!-- Mental/Tactical Evaluation -->
            <div class="section">
              <div class="section-header">Strategic Approach</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Formation Knowledge</td><td class="attribute-cell attr-value">91 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 91%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Game Analysis</td><td class="attribute-cell attr-value">89 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 89%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Opposition Study</td><td class="attribute-cell attr-value">88 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 88%"></div></div></td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Adaptability</td><td class="attribute-cell attr-value">87 <div class="attr-bar-bg"><div class="attr-bar-fill" style="width: 87%"></div></div></td></tr>
              </table>
            </div>

            <!-- Advanced Metrics -->
            <div class="section">
              <div class="section-header">Professional Metrics</div>
              <table class="attribute-table">
                <tr class="attribute-row"><td class="attribute-cell attr-label">Track Record</td><td class="attribute-cell attr-value">Excellent</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Certifications</td><td class="attribute-cell attr-value">UEFA A License</td></tr>
                <tr class="attribute-row"><td class="attribute-cell attr-label">Player Development</td><td class="attribute-cell attr-value">Strong</td></tr>
                <tr class="attribute-row"><td class="attribute-row"><td class="attribute-cell attr-label">Success Rate</td><td class="attribute-cell attr-value">Elite</td></tr>
              </table>
            </div>

            <!-- Career Timeline -->
            <div class="section full-width">
              <div class="section-header">Professional Career History</div>
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr style="background: #f9f9f9; text-align: left; font-size: 11px; font-weight: 900; text-transform: uppercase;">
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Season</th>
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Club</th>
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Position / Role</th>
                  <th style="padding: 12px; border-bottom: 2px solid #eee">Status</th>
                </tr>
                <tr style="font-size: 13px;">
                  <td style="padding: 12px; border-bottom: 1px solid #eee">2020 - Pres</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Professional Club</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Head Coach</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Active</td>
                </tr>
                <tr style="font-size: 13px;">
                  <td style="padding: 12px; border-bottom: 1px solid #eee">2016 - 2020</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Academy Club</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Assistant Coach</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee">Completed</td>
                </tr>
              </table>
            </div>

            <div class="section full-width highlight-box">
              <div class="section-header">Professional Summary</div>
              <p style="font-size: 13px; color: #444; margin: 0;">
                Experienced coaching professional with a proven track record in tactical innovation and player development. Known for building cohesive teams and implementing effective strategic systems.
              </p>
            </div>
          </div>

          <div class="footer">
            <span>Tech ID: 9F8E7D6C • Confirmed By: ER Coaching Dept</span>
            <span>Page 1 of 1 • Internal Document</span>
            <span>Date: ${new Date().toLocaleDateString()}</span>
          </div>

          <script>
            window.onload = function() { 
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex justify-between items-end print:hidden">
        <div>
          <h1 className="text-5xl font-black text-white font-orbitron uppercase tracking-tight">Generate CV</h1>
          <p className="text-white/60 font-medium mt-2 text-lg">My Professional Coaching Profile</p>
        </div>
        <Button
          onClick={generateProfessionalPDF}
          className="bg-[#222222] hover:bg-[#333333] text-white border border-white/5 gap-2 px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] h-auto"
        >
          <IconDownload size={18} /> Download CV PDF
        </Button>
      </div>



      {/* Main Content */}
      <div className="flex flex-col gap-6">
        {/* Personal Information Hero - Restoring Original Design */}
        <section className="bg-[#111111] rounded-3xl border border-white/10 p-4 md:p-8 flex flex-col gap-8">
          <div className="relative rounded-3xl overflow-hidden min-h-[400px] md:min-h-[560px] border border-white/10 group flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('/stadium-night.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 via-[45%] to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute right-0 bottom-0 h-full w-[70%] p-8  md:w-[40%] flex items-center justify-center pointer-events-none opacity-60 md:opacity-100">
              <img
                src={coachData.coachImage?.src || coachData.coachImage}
                alt={coachData.fullName}
                className="h-[90%] md:h-[105%] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
              />
            </div>

            <div className="relative p-6 md:p-10 w-full space-y-8">
              <div className="flex flex-col gap-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-gold bg-gold/80 flex items-center justify-center backdrop-blur-2xl shadow-2xl">
                  <span className="text-3xl md:text-4xl font-black text-white font-orbitron">{overallRating}</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#E31B23] border border-[#E31B23]/20 px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase w-fit tracking-[0.2em] shadow-[0_0_20px_rgba(227,27,35,0.3)]">{coachData.transferStatus}</div>
                  <div className="space-y-2">
                    <h1 className="text-3xl md:text-6xl font-black text-white font-orbitron uppercase tracking-tighter leading-none">{coachData.fullName}</h1>
                    <div className="flex flex-wrap items-center gap-3 md:gap-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] pt-1">
                      <span className="text-[#E31B23]">{coachData.coachType}</span>
                      <span className="text-white/20 hidden md:inline">/</span>
                      <span className="text-white">15+ Years Experience</span>
                      <span className="text-white/20 hidden md:inline">/</span>
                      <span className="flex items-center gap-3 text-white">
                        <img
                          src={getFlagUrl(coachData.birthCountry)}
                          alt={coachData.birthCountry}
                          className="w-4 h-3 md:w-5 md:h-3.5 object-cover rounded-sm shadow-sm"
                        /> {coachData.birthCountry}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6 pt-4 md:pt-8 max-w-2xl p-4 md:p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconShield size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Current Club</p>
                    <p className="text-sm font-bold text-white">{coachData.clubs[0]?.name || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconPhone size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Contact</p>
                    <p className="text-sm font-bold text-white">{coachData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconClock size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Validation Status</p>
                    <p className="text-sm font-bold text-[#FBBF24]">15 days until re-validation</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white/40"><IconMail size={20} /></div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Email</p>
                    <p className="text-sm font-bold text-white truncate max-w-[180px]">{coachData.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Squares - As requested by client doc */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full">
          {/* Completion Status */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6">
            <h3 className="text-sm font-black text-white font-orbitron uppercase tracking-widest">Completion Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-5xl font-black text-[#E31B23] font-orbitron">85%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#E31B23] rounded-full" style={{ width: "85%" }} />
              </div>
              <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-wider">
                Complete all sections to unlock Gold tier status
              </p>
            </div>
          </div>

          {/* Tier Status */}
          <div className="bg-[#111111] rounded-3xl border border-white/10 p-8 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FBBF24]/10 blur-3xl rounded-full" />
            <div className="flex flex-col">
              <h3 className="text-3xl font-black text-[#FBBF24] font-orbitron italic tracking-tighter leading-none">GOLD</h3>
              <div className="w-full h-1 bg-[#FBBF24] mt-2 opacity-50" />
            </div>
            <p className="text-[10px] text-white/60 font-bold leading-relaxed uppercase tracking-wider mt-2">
              Your CV meets Gold standards and is ready to share with top clubs and agents.
            </p>
            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 gap-2 w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] h-auto mt-4">
              <IconShare size={18} className="text-white/40" /> Request Re-validation
            </Button>
          </div>

          {/* Player CV Validations */}
          <section className="p-6 rounded-2xl border border-white/20 bg-[#0D0D0D]">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-[#E31B23]/10 text-[#E31B23]">
                <IconUserCheck size={20} />
              </div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">Player CV Validations</h2>
            </div>
            <div className="space-y-4">
              {validationNeededPlayers.length > 0 ? (
                validationNeededPlayers.map((player) => {
                  const reason = getValidationReason(player);
                  const reasonColors =
                    reason === "Requested"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : reason === "Expired"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20";

                  return (
                    <div key={player.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 group hover:border-[#E31B23]/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <img src={player.playerImage} className="w-10 h-10 rounded-full object-cover border border-white/10" alt={player.fullName} />
                        <div>
                          <div className="text-sm font-bold text-white">{player.fullName}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest">{player.position}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider border ${reasonColors}`}>
                              {reason}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-black text-white italic">{player.rating}</div>
                        <button
                          onClick={() => {
                            selectPlayer(player.id);
                            router.push("/cvs-page/player-cv-details");
                          }}
                          className="px-3 py-1.5 bg-[#E31B23] hover:bg-[#ff2d35] text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all border border-[#E31B23]/50 cursor-pointer"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-white/40 uppercase tracking-wider font-bold">
                  All Player CVs Validated
                </div>
              )}
            </div>
          </section>
        </div>
        <FullEditableCv editable={true} />
      </div>


      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .container {
            width: 100% !important;
            max-width: none !important;
            padding: 20px !important;
          }
          /* Ensure backgrounds print */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Fix for grid layouts in print */
          .grid {
            display: grid !important;
          }
          /* Force dark theme colors in print */
          section, div, h1, h2, h3, h4, p, span {
            color: white !important;
          }
          .bg-black { background-color: #000 !important; }
          .bg-\\[\\#111111\\] { background-color: #111111 !important; }
          .border { border-color: rgba(255, 255, 255, 0.1) !important; }
          
          /* Hide edit buttons and adjust layout for A4 */
          button { display: none !important; }
          input, textarea { 
            border: none !important; 
            background: transparent !important;
            padding: 0 !important;
            color: white !important;
          }
          
          /* Custom PDF Header */
          .pdf-footer {
            position: fixed;
            bottom: 20px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.4);
            text-transform: uppercase;
            letter-spacing: 2px;
          }
        }
      `}</style>
      <div className="pdf-footer hidden print:block">
        Generated by Eddie Ricci Football Management Platform • Professional Coaching Profile
      </div>
    </div>
  );
};

export default GenerateCvCoach;
