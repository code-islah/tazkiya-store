function Footer() {
  return (
    <div className="grid clr-bg-dark clr-text-lightSub">
      <img className="w-20 pl-4 pt-3" src="/logo.png" alt="logo" />
      <div className="p-3">
        <p className="py-3 clr-text-light text-sm italic">
          আরাম পাড়া, চুয়াডাঙ্গা। মাছের আড়তের পাশে, গোরস্থান মসজিদের সম্মুখে।
        </p>
        <p className="italic text-sm clr-text-lightSub">
          01714994157, 01518461669
        </p>
        <div className="py-5">
        <h1 className="text-sky-400 text-lg text-bold my-3">আপনার মতামত জানান!</h1>
        <div className="grid gap-2 clr-text-dark">
        <input className="w-full px-3 p-1 rounded
        focus:outline focus:outline-2 focus:outline-sky-400
        " type="text" placeholder="আপনার নামঃ"/>
        <input className="w-full px-3 p-1 rounded
        focus:outline focus:outline-2 focus:outline-sky-400" type="text" placeholder="আপনার ই-মেইলঃ"/>
        <textarea className="w-full px-3 p-1 rounded focus:outline focus:outline-2 focus:outline-sky-400" type="text" placeholder="আপনার মতামত-"></textarea>
        <div className="flex gap-1">
        <button className="bg-sky-400 text-white flex-1 p-1 rounded">পাঠান</button>
        <button className="bg-sky-400 text-white flex-1 p-1 rounded">মুছুন</button>
        </div>
        </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3654.987436116533!2d88.85146007533255!3d23.640620978745474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDM4JzI2LjIiTiA4OMKwNTEnMTQuNSJF!5e0!3m2!1sen!2sbd!4v1772242411481!5m2!1sen!2sbd"
          className="w-full mt-3 bg-black/50 rounded shadow-xl"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="grid p-3 gap-2">
        <span>About Us</span>
        <span>Contact</span>
        <span>Instructions on order</span>
        <span>
          <a href="https://quranmajid.netlify.app/">
            Online Al Quran <span className="text-sky-400">❯</span>
          </a>
        </span>
        <span>
          <a href="https://codeislah.netlify.app/">
            Web Development <span className="text-sky-400">❯</span>
          </a>
        </span>
        <span>
          <a href="https://agamhisab.netlify.app/">
            Inventory Management <span className="text-sky-400">❯</span>
          </a>
        </span>
        <span>Resources</span>
      </div>
      <p className="p-1 py-3 flex gap-2 justify-center clr-bg-dark clr-text-light text-center">
        <span className="text-sky-400 font-bold">Code Islah</span> - @Copyright{" "}
        {new Date().getFullYear()}{" "}
        <a href="https://github.com/code-islah/tazkiya-store">
          <img className="w-6" src="/SVGs/github.svg" alt="github" />
        </a>
      </p>
    </div>
  );
}

export default Footer;
