import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SectionIntro from "@/components/SectionIntro";
import SectionWhat from "@/components/SectionWhat";
import SectionGateway from "@/components/SectionGateway";
import SectionServices from "@/components/SectionServices";
import SectionIndustries from "@/components/SectionIndustries";
import SectionRegions from "@/components/SectionRegions";
import SectionProcess from "@/components/SectionProcess";
import SectionWhy from "@/components/SectionWhy";
import SectionCases from "@/components/SectionCases";
import SectionAbout from "@/components/SectionAbout";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";

function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid var(--rule)", margin: "0 4rem" }} />;
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Divider />
        <SectionIntro />
        <Divider />
        <SectionWhat />
        <SectionGateway />
        <SectionServices />
        <Divider />
        <SectionIndustries />
        <SectionRegions />
        <SectionProcess />
        <Divider />
        <SectionWhy />
        <SectionCases />
        <Divider />
        <SectionAbout />
        <SectionContact />
      </main>
      <Footer />
    </>
  );
}
