
import { LanguageCode } from "../types";
import { t } from "./languages";

export const getNetworkingOptionsXML = (lang: LanguageCode): string => `
<reply>
${t('net_intro', lang)}
</reply>
<question>
<header>${t('net_header', lang)}</header>
<option value="CONFIRM_NET_DESIGN">${t('net_opt_design', lang)}</option>
<option value="CONFIRM_NET_LINKEDIN">${t('net_opt_linkedin', lang)}</option>
<option value="CONFIRM_NET_HOBBIES">${t('net_opt_hobbies', lang)}</option>
<option value="CONFIRM_NET_PARENTS">${t('net_opt_parents', lang)}</option>
<option value="CONFIRM_NET_INTROVERT">${t('net_opt_introvert', lang)}</option>
</question>
`;

const RESPONSES: Record<string, Record<string, { text: string, articleId?: string }>> = {
  "CONFIRM_NET_DESIGN": {
    en: {
      text: `**The Design Community in Finland**\n\nThe design community in Finland is relatively small, tight-knit, but very welcoming to international talent.\n\n1. **Key Hubs:** Helsinki is the center (Design District), but Lahti is also significant.\n2. **Organizations:** Look into *Ornamo* (Art and Design Finland) and *Grafia*.\n3. **Events:** *Helsinki Design Week* (September) is the biggest event of the year. Volunteering there is a massive networking hack.\n\n*Would you like me to find specific design meetups happening soon?*`,
      articleId: 'job_networking'
    },
    fi: {
      text: `**Muotoilualan yhteisö Suomessa**\n\nSuomen muotoiluyhteisö on suhteellisen pieni ja tiivis, mutta toivottaa kansainväliset osaajat tervetulleiksi.\n\n1. **Keskukset:** Helsinki on keskus (Design District), mutta myös Lahti on merkittävä.\n2. **Järjestöt:** Tutustu *Ornamoon* ja *Grafiaan*.\n3. **Tapahtumat:** *Helsinki Design Week* (syyskuu) on vuoden isoin tapahtuma. Vapaaehtoistyö siellä on loistava tapa verkostoitua.`,
      articleId: 'job_networking'
    },
    vi: {
      text: `**Cộng đồng Thiết kế tại Phần Lan**\n\nCộng đồng thiết kế ở Phần Lan khá nhỏ, gắn kết chặt chẽ nhưng rất chào đón nhân tài quốc tế.\n\n1. **Trung tâm chính:** Helsinki là trung tâm (Khu thiết kế), nhưng Lahti cũng rất quan trọng.\n2. **Tổ chức:** Hãy tìm hiểu *Ornamo* và *Grafia*.\n3. **Sự kiện:** *Tuần lễ Thiết kế Helsinki* (Tháng 9) là sự kiện lớn nhất năm. Làm tình nguyện viên ở đó là cách tuyệt vời để kết nối.`,
      articleId: 'job_networking'
    }
  },
  "CONFIRM_NET_LINKEDIN": {
    en: {
      text: `**LinkedIn Strategy for Finland**\n\nLinkedIn plays a much bigger role in Finland than in many other countries. It's not just a CV; it's a search engine for recruiters.\n\n1. **The Keyword Rule:** Recruiters search in English. Ensure your headline says "Industrial Designer" or "UX Designer", not just "Designer".\n2. **Open to Work:** Use the green banner. It is culturally accepted here and shows availability.\n3. **The "About" Section:** Finns value personality. Don't just list skills; write 3 lines about *who* you are and what you enjoy building.\n\n*Shall we draft a new headline for your profile together?*`,
      articleId: 'net_linkedin'
    },
    fi: {
      text: `**LinkedIn-strategia Suomessa**\n\nLinkedInillä on Suomessa valtava rooli. Se ei ole vain CV, vaan hakukone rekrytoijille.\n\n1. **Avainsanat:** Rekrytoijat hakevat englanniksi. Varmista, että otsikkosi on tarkka (esim. "UX Designer").\n2. **Open to Work:** Käytä vihreää banneria. Se on täällä hyväksytty tapa kertoa käytettävyydestä.\n3. **Tietoja-osio:** Suomalaiset arvostavat persoonaa. Kerro lyhyesti kuka olet, älä vain listaa taitoja.`,
      articleId: 'net_linkedin'
    },
    vi: {
      text: `**Chiến lược LinkedIn cho Phần Lan**\n\nLinkedIn đóng vai trò rất lớn ở Phần Lan. Nó không chỉ là CV mà là công cụ tìm kiếm cho nhà tuyển dụng.\n\n1. **Từ khóa:** Nhà tuyển dụng tìm kiếm bằng tiếng Anh. Hãy chắc chắn tiêu đề của bạn rõ ràng (ví dụ: "UX Designer").\n2. **Open to Work:** Sử dụng biểu ngữ màu xanh lá cây. Nó được chấp nhận về mặt văn hóa ở đây.\n3. **Phần giới thiệu:** Người Phần Lan coi trọng cá tính. Đừng chỉ liệt kê kỹ năng; hãy viết 3 dòng về việc bạn là ai.`,
      articleId: 'net_linkedin'
    }
  },
  "CONFIRM_NET_HOBBIES": {
    en: {
      text: `**Networking Through Hobbies**\n\nThis is the "secret backdoor" to Finnish society. Finns bond over *doing* things together (talkoot spirit), not just standing around talking.\n\n1. **Kansalaisopisto:** These are Adult Education Centres. You can take a pottery, woodworking, or painting class cheaply. You will meet locals in a relaxed setting.\n2. **Sports:** Padel, climbing, and floorball are huge. Joining a "beginner group" is an instant social circle.\n3. **Volunteering:** Events like *Slush* or local festivals always need hands.\n\n*What kind of activity sounds less exhausting to you right now?*`,
      articleId: 'family_activities'
    },
    fi: {
      text: `**Verkostoituminen harrastusten kautta**\n\nTämä on "salainen takaovi" suomalaiseen yhteiskuntaan. Suomalaiset ystävystyvät *tekemisen* kautta.\n\n1. **Kansalaisopistot:** Voit osallistua kursseille halvalla ja tavata paikallisia rennossa ympäristössä.\n2. **Urheilu:** Padel, kiipeily ja salibandy ovat suosittuja. Liity aloittelijaryhmään.\n3. **Vapaaehtoistyö:** Tapahtumat kuten *Slush* tai festivaalit tarvitsevat aina apukäsiä.`,
      articleId: 'family_activities'
    },
    vi: {
      text: `**Kết nối qua sở thích**\n\nĐây là "cửa sau bí mật" vào xã hội Phần Lan. Người Phần Lan gắn kết qua việc *cùng làm* (tinh thần talkoot).\n\n1. **Kansalaisopisto:** Các trung tâm giáo dục người lớn. Bạn có thể học gốm, mộc với giá rẻ và gặp người địa phương.\n2. **Thể thao:** Padel, leo núi và bóng sàn rất lớn. Tham gia nhóm người mới bắt đầu để có vòng tròn xã hội ngay lập tức.\n3. **Tình nguyện:** Các sự kiện như *Slush* luôn cần người giúp.`,
      articleId: 'family_activities'
    }
  },
  "CONFIRM_NET_PARENTS": {
    en: {
      text: `**Networking for Busy Parents**\n\nWhen you’re balancing work, family, and settling in, time is luxury. You need high-efficiency connections.\n\n1. **Playground Diplomacy:** This is real. If you go to the same park (leikkipuisto) at the same time, you will see the same parents. A simple "Moi" eventually leads to conversation.\n2. **Mannerheim League (MLL):** They organize "Family Cafés" (Perhekahvila). It's a drop-in place for parents to drink coffee while kids play. Great for meeting other parents.\n3. **Daycare Events:** Go to the "talkoot" (volunteer cleaning day) at your child's daycare. It's the fastest way to gain respect from other parents.`,
      articleId: 'family_daycare'
    },
    fi: {
      text: `**Verkostoituminen vanhemmille**\n\nKun tasapainoilet työn ja perheen välillä, aika on kortilla.\n\n1. **Leikkipuistot:** Jos käyt samassa puistossa samaan aikaan, näet samat vanhemmat. Yksinkertainen "Moi" johtaa lopulta keskusteluun.\n2. **MLL:** Perhekahvilat ovat loistavia paikkoja tavata muita vanhempia rennosti.\n3. **Päiväkodin talkoot:** Osallistu talkoisiin. Se on nopein tapa saada muiden vanhempien kunnioitus.`,
      articleId: 'family_daycare'
    },
    vi: {
      text: `**Kết nối cho Cha mẹ bận rộn**\n\nKhi bạn cân bằng công việc và gia đình, thời gian là xa xỉ.\n\n1. **Ngoại giao sân chơi:** Nếu bạn đến cùng một công viên vào cùng một giờ, bạn sẽ gặp cùng những phụ huynh. Một câu "Moi" đơn giản sẽ dẫn đến trò chuyện.\n2. **MLL:** Họ tổ chức "Family Cafés". Nơi cha mẹ uống cà phê khi con chơi.\n3. **Sự kiện nhà trẻ:** Tham gia ngày dọn dẹp tình nguyện (talkoot) tại nhà trẻ. Cách nhanh nhất để được tôn trọng.`,
      articleId: 'family_daycare'
    }
  },
  "CONFIRM_NET_INTROVERT": {
    en: {
      text: `**Low-Pressure Networking**\n\nIf you are feeling introverted or overwhelmed, that is okay. You don't need to go to a loud party.\n\n1. **Library Events:** Libraries like *Oodi* host quiet workshops and book clubs. Very low pressure.\n2. **Online Communities:** "Finland International" or specific Facebook groups for your profession allow you to observe and comment before meeting anyone.\n3. **One-on-One:** Finns prefer deep 1-on-1 conversation over mingling. Ask one person for a "virtual coffee" (15 min call). It is less scary than a live event.\n\n*Start small. You don't have to conquer the city in a day.*`,
      articleId: 'culture_smalltalk'
    },
    fi: {
      text: `**Matala kynnys verkostoitumiseen**\n\nJos tunnet itsesi introvertiksi, se on ok. Ei tarvitse mennä meluisiin juhliin.\n\n1. **Kirjastot:** *Oodi* ja muut kirjastot järjestävät hiljaisia työpajoja. Ei paineita.\n2. **Verkkoyhteisöt:** Facebook-ryhmät antavat mahdollisuuden tarkkailla ennen tapaamista.\n3. **Kahden kesken:** Suomalaiset suosivat syvällisiä kahdenkeskisiä keskusteluja. Pyydä yhtä ihmistä "virtuaalikahville".\n\n*Aloita pienestä. Kaupunkia ei tarvitse valloittaa päivässä.*`,
      articleId: 'culture_smalltalk'
    },
    vi: {
      text: `**Kết nối áp lực thấp**\n\nNếu bạn hướng nội, không sao cả.\n\n1. **Sự kiện thư viện:** Các thư viện như *Oodi* tổ chức hội thảo yên tĩnh. Rất ít áp lực.\n2. **Cộng đồng trực tuyến:** Các nhóm Facebook cho phép bạn quan sát trước khi gặp gỡ.\n3. **1-1:** Người Phần Lan thích trò chuyện sâu sắc 1-1 hơn là tiệc tùng. Mời một người uống "cà phê ảo".\n\n*Bắt đầu nhỏ. Bạn không cần chinh phục cả thành phố trong một ngày.*`,
      articleId: 'culture_smalltalk'
    }
  }
};

export const getNetworkingResponse = (id: string, lang: LanguageCode): { text: string, articleId?: string } | null => {
  const item = RESPONSES[id];
  if (!item) return null;
  
  // Fallback chain: Exact Lang -> English -> First Available
  return item[lang] || item['en'] || Object.values(item)[0];
};
