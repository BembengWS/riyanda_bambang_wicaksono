document.addEventListener("DOMContentLoaded",()=>{
 const body=document.body;
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const progress=document.querySelector(".scroll-progress span");
 const darkToggle=document.getElementById("darkToggle");
 const dot=document.querySelector(".cursor-dot");
 const ring=document.querySelector(".cursor-ring");

 // Mobile navigation.
 const mobileMenu=document.getElementById("mobileMenu");
 const mobileOpen=document.getElementById("mobileMenuToggle");
 const mobileClose=document.getElementById("mobileMenuClose");
 const closeMobile=()=>mobileMenu&&mobileMenu.classList.remove("open");
 if(mobileOpen) mobileOpen.addEventListener("click",()=>mobileMenu.classList.add("open"));
 if(mobileClose) mobileClose.addEventListener("click",closeMobile);
 document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",closeMobile));

 // Preserve theme.
 if(localStorage.getItem("theme")==="dark") body.classList.add("dark");
 if(darkToggle){
   darkToggle.textContent=body.classList.contains("dark")?"○":"◐";
   darkToggle.addEventListener("click",()=>{
     body.classList.toggle("dark");
     localStorage.setItem("theme",body.classList.contains("dark")?"dark":"light");
     darkToggle.textContent=body.classList.contains("dark")?"○":"◐";
   });
 }

 // Preserve typing.
 const typingEl=document.getElementById("typing");
 if(typingEl){
   const words=["Customer Experience Analyst","Data & Dashboard Specialist","Digital Marketing Professional","Partnership & Marketplace Specialist"];
   let wi=0,ci=0,del=false;
   const loop=()=>{
     const w=words[wi]; typingEl.textContent=w.slice(0,ci);
     if(!del){ci++;if(ci>w.length){del=true;return setTimeout(loop,1000)}} 
     else {ci--;if(ci<0){del=false;wi=(wi+1)%words.length;return setTimeout(loop,250)}}
     setTimeout(loop,del?38:70);
   }; loop();
 }

 // Preserve counter.
 document.querySelectorAll(".counter").forEach(el=>{
   const target=Number(el.dataset.target)||0;
   let ran=false;
   const io=new IntersectionObserver(es=>{
     es.forEach(e=>{
       if(e.isIntersecting&&!ran){
         ran=true;let n=0;
         const tick=()=>{n+=Math.max(target/70,1);el.textContent=Math.min(target,Math.floor(n));if(n<target)requestAnimationFrame(tick)};
         tick();io.disconnect();
       }
     })
   },{threshold:.6}); io.observe(el);
 });

 // Lightweight cursor.
 if(!reduce && dot && ring){
   let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
   addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY});
   const cursor=()=>{
     rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
     dot.style.left=mx+"px";dot.style.top=my+"px";
     ring.style.left=rx+"px";ring.style.top=ry+"px";
     requestAnimationFrame(cursor);
   }; cursor();
   document.querySelectorAll("a,button,.card,.skill-card,img").forEach(el=>{
     el.addEventListener("mouseenter",()=>ring.classList.add("active"));
     el.addEventListener("mouseleave",()=>ring.classList.remove("active"));
   });
 }

 if(reduce || !window.gsap || !window.ScrollTrigger){
   // Fallback for no animation library / reduced motion.
   document.querySelectorAll(".display-title span,.hero-eyebrow,.hero-image,.hero-bottom").forEach(el=>{
     el.style.opacity="1";el.style.transform="none";el.style.clipPath="none";
   });
   document.querySelectorAll(".reveal").forEach(el=>el.classList.add("show"));
   return;
 }

 gsap.registerPlugin(ScrollTrigger);
 body.classList.add("is-loading");

 // Lenis smooth scroll.
 let lenis=null;
 if(window.Lenis){
   lenis=new Lenis({duration:1.15,easing:t=>1-Math.pow(1-t,4),smoothWheel:true});
   lenis.on("scroll",ScrollTrigger.update);
   gsap.ticker.add(t=>lenis.raf(t*1000));
   gsap.ticker.lagSmoothing(0);
 }

 // Intro curtain + hero choreography.
 const intro=gsap.timeline({defaults:{ease:"power4.out"},onComplete:()=>body.classList.remove("is-loading")});
 intro.to(".transition-curtain",{scaleY:0,duration:1.05,ease:"power4.inOut"})
 .to(".hero-eyebrow",{opacity:1,y:0,duration:.55},.25)
 .to(".display-title span",{y:"0%",opacity:1,duration:1.0,stagger:.11},.3)
 .to(".hero-image",{opacity:1,clipPath:"inset(0% 0 0 0)",duration:1.25,ease:"power3.inOut"},.45)
 .to(".hero-bottom",{opacity:1,y:0,duration:.65},.75);

 // Progress.
 gsap.to(progress,{width:"100%",ease:"none",scrollTrigger:{start:0,end:"max",scrub:true}});

 // Hero dissolves into the next scene.
 gsap.timeline({
   scrollTrigger:{trigger:"#home",start:"top top",end:"bottom top",scrub:1}
 })
 .to(".display-title",{y:"-18vh",scale:.82,opacity:.18},0)
 .to(".hero-eyebrow",{y:-80,opacity:0},0)
 .to(".hero-image",{y:"24vh",x:"7vw",rotation:-2,scale:.82,opacity:.35},0);

 // About typography: make each paragraph respond to scroll.
 document.querySelectorAll("#about .about-card p").forEach((p,i)=>{
   ScrollTrigger.create({
     trigger:p,start:"top 72%",end:"bottom 35%",
     onEnter:()=>p.classList.add("is-active"),
     onEnterBack:()=>p.classList.add("is-active"),
     onLeave:()=>p.classList.remove("is-active"),
     onLeaveBack:()=>p.classList.remove("is-active")
   });
 });
 gsap.to("#about .container:after",{scaleY:1,ease:"none",scrollTrigger:{trigger:"#about",start:"top 60%",end:"bottom 60%",scrub:true}});

 // Experience timeline draws itself.
 gsap.to(".experience-list:before",{scaleY:1,ease:"none",scrollTrigger:{trigger:"#experience",start:"top 70%",end:"bottom 70%",scrub:true}});
 gsap.utils.toArray(".experience-list .card").forEach((card,i)=>{
   gsap.fromTo(card,{x:i%2?45:-45,opacity:.2},{x:0,opacity:1,duration:.8,ease:"power3.out",
     scrollTrigger:{trigger:card,start:"top 82%",end:"top 48%",scrub:1}});
 });

 // Project choreography: images breathe and reveal.
 gsap.utils.toArray("#projects .card").forEach((card,i)=>{
   const img=card.querySelector("img");
   gsap.fromTo(card,{opacity:0,y:100},{opacity:1,y:0,duration:1,
     scrollTrigger:{trigger:card,start:"top 85%",end:"top 55%",scrub:1}});
   if(img){
     gsap.fromTo(img,{scale:1.16,y:50},{scale:1,y:0,ease:"none",
       scrollTrigger:{trigger:img,start:"top bottom",end:"bottom top",scrub:1}});
   }
   gsap.to(card,{x:i%2?30:-30,scrollTrigger:{trigger:card,start:"top bottom",end:"bottom top",scrub:1}});
 });

 // Skills grid: alternating editorial entrance.
 gsap.utils.toArray("#skills .skill-card").forEach((card,i)=>{
   gsap.fromTo(card,{y:80,opacity:0},{y:0,opacity:1,ease:"power3.out",
     scrollTrigger:{trigger:card,start:"top 88%",end:"top 65%",scrub:1}});
 });

 // Education: large reveal.
 gsap.to("#education .card",{opacity:1,scale:1,ease:"power3.out",
   scrollTrigger:{trigger:"#education",start:"top 65%",end:"top 25%",scrub:1}});

 // Contact finale.
 gsap.to("#contact .contact-inner",{opacity:1,y:0,ease:"power3.out",
   scrollTrigger:{trigger:"#contact",start:"top 70%",end:"top 30%",scrub:1}});

 // Magnetic button.
 document.querySelectorAll(".btn").forEach(btn=>{
   btn.addEventListener("mousemove",e=>{
     const r=btn.getBoundingClientRect();
     gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.18,y:(e.clientY-r.top-r.height/2)*.18,duration:.35,ease:"power3.out"});
   });
   btn.addEventListener("mouseleave",()=>gsap.to(btn,{x:0,y:0,duration:.5,ease:"elastic.out(1,.45)"}));
 });

 // Smooth anchor navigation with Lenis when available.
 document.querySelectorAll('a[href^="#"]').forEach(a=>{
   a.addEventListener("click",e=>{
     const target=document.querySelector(a.getAttribute("href"));
     if(!target)return;
     e.preventDefault();
     if(lenis) lenis.scrollTo(target,{offset:-20,duration:1.25});
     else target.scrollIntoView({behavior:"smooth"});
   });
 });

 // Refresh after images settle.
 addEventListener("load",()=>ScrollTrigger.refresh());
});
