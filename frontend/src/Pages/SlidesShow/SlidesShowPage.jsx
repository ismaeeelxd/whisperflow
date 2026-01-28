import React, { useState, useEffect } from 'react';
import SlideList from './components/SlideList';
import SlideViewer from './components/SlideViewer';
import RightPanel from './components/RightPanel';
import Header from './components/Header';

// Mock Data
const MOCK_SLIDES = [
  {
    id: 1,
    title: "Introduction",
    duration: "00:15",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvEk87GClJnX3aH2lsKBdH2874H2TylRk957Z-6Sr5w9KO0HPPLSpxUAD5Lo9atgJr8ZjZ--EO7Nz_ha8ETYqNXMsRYbYl0X8-KEAfZz4S2GNMZ0BdghY1m-muhzQeYuganIc3yCj6UQzchqfiD6y9JkSWdorn_inIwqsOc28e-LPHd4zpCLsP8EPYwPqITDoNeH92DTZrEpLISaiYRzWljCAHq7i4DsMtDTVOBqqiRDkrfkqWTikRKSYRimSRyt4rcYpcwwU5gaVu",
    content: {
      en: {
        title: "Introduction to Neural Networks",
        points: [
          "Neural networks are a set of algorithms, modeled loosely after the human brain.",
          "They are designed to recognize patterns.",
          "They interpret sensory data through a kind of machine perception, labeling or clustering raw input."
        ]
      },
      ar: {
        title: "مقدمة في الشبكات العصبية",
        points: [
          "الشبكات العصبية هي مجموعة من الخوارزميات، مصممة بشكل مشابه للدماغ البشري.",
          "تم تصميمها للتعرف على الأنماط.",
          "تقوم بتفسير البيانات الحسية من خلال نوع من الإدراك الآلي، وتصنيف أو تجميع المدخلات الخام."
        ]
      }
    }
  },
  {
    id: 2,
    title: "History of AI",
    duration: "01:42",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg2XW3NiKM4kJSIlcehXXQfaE2DHFGf3U8831GOpvqkbZr_F2ghsn2wx-IGXHuSGbKtxRLrZg3RhWMe8UDuwo3tFqaUPOSKCLY4mVijnuE97xjWwXvjqsOLsjPM0Kd7ThAqy5vUY2JqOPbE-Idz4XDFU7TsLxPfWU5qfy47Icpb2lkcADG-yuNEPksNN2qH9jVDr32SbS9cnzH_kSDWWIE6pSaPFRT80Izb9giLJ10v5cvs9_PMOSM29rHbreC5LSVTUnDEEJqiDI9",
    content: {
      en: {
        title: "Brief History of AI",
        points: [
          "1950: Alan Turing proposes the Turing Test.",
          "1956: The term 'Artificial Intelligence' is coined at the Dartmouth Conference.",
          "1997: Deep Blue defeats Garry Kasparov at chess."
        ]
      },
      ar: {
        title: "تاريخ موجز للذكاء الاصطناعي",
        points: [
          "1950: آلان تورينج يقترح اختبار تورينج.",
          "1956: صياغة مصطلح 'الذكاء الاصطناعي' في مؤتمر دارتموث.",
          "1997: ديب بلو يهزم غاري كاسباروف في الشطرنج."
        ]
      }
    }
  },
  {
    id: 3,
    title: "Perceptrons",
    duration: "02:14",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUrohQGSmhKrxf7qnJKK3uhExJLa-fIYHKy0MUSmZYzl6oLnxVT-ogBl56Z-8RheUv2ZmxuS-sMc3sX96xcGOZhScXn3Uh6_MHoxr863BNRk6KJ_d82gh3ISSVfadd_bgZUziZB0fwHpZ3YNG3e7hs8hfXbqKU9MOgIVcmgdpBeSWN-9GUjm7bkvcHTFj77DoMp4joRa1GcHmt7fDr2lxg2x0FDAzqtoApVJHsBOoKuEY2-3gL69QrxhBLHpuW_XfQfJm7q_gRbpOw",
    content: {
      en: {
        title: "Understanding Perceptrons",
        points: [
          "A perceptron is the simplest form of a neural network used for binary classification.",
          "It consists of input values, weights, a bias, a weighted sum, and an activation function.",
          "Frank Rosenblatt invented the perceptron in 1958."
        ]
      },
      ar: {
        title: "فهم المدركات (Perceptrons)",
        points: [
          "المدرك هو أبسط شكل للشبكة العصبية المستخدمة للتصنيف الثنائي.",
          "يتكون من قيم المدخلات، الأوزان، التحيز، المجموع المرجح، ودالة التنشيط.",
          "اخترع فرانك روزنبلات المدرك في عام 1958."
        ]
      }
    }
  },
  {
    id: 4,
    title: "Activation Functions",
    duration: "05:00",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7g8wFD5OgJJJZjG-XydIZYgSttzH5u9IonP_8FaeLHJpeN-INUOBCw-En3W3lM3ca48lp6pvR0L4kIExtQ_K4xiKdydsflzoIrrfpCvr3Y2klf8sqizw4fCOPhEVh3vCLXphDaDmhY3TNnsPY_7b-qwEQkd7uqqIphLgyPkzcYb5SfZ2h4FHpL0_oSIJds2ZlVigxu7pl9K6t9N8ybiMivY-bJkDMJVwtEa1TR5ywLsUOa-S0SYAYibjxcTQVIonX-lg9bRtKM7_j",
    content: {
      en: {
        title: "Activation Functions",
        points: [
          "They decide whether a neuron should be activated or not.",
          "Common functions include Sigmoid, ReLU, and Tanh.",
          "Without them, a neural network is just a linear regression model."
        ]
      },
      ar: {
        title: "دوال التنشيط",
        points: [
          "تقرر ما إذا كان يجب تنشيط العصبون أم لا.",
          "تشمل الدوال الشائعة Sigmoid و ReLU و Tanh.",
          "بدونها، تكون الشبكة العصبية مجرد نموذج انحدار خطي."
        ]
      }
    }
  },
  {
    id: 5,
    title: "Multi-Layer Networks",
    duration: "03:30",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE4dO3GRGArdJnMPIhRyfNT4qGWUEosF2tcN_IePW7qMk_HXJVVY76YsHmIJ5Wx799PmphjRxJxmMwb7uih0PyIOMVkIdgxyUBoW9Ss-ZvlE8hXOSzxow9Kcwl4v5moJOfhR2U8fA1ILHBiPU3st2A5qEvO-atnZUEEsY8LQcU6pcKlxpz8jlMO-eGDkUoO154A6-fg2UNwzSjmODH39en5UQ5k8Gu9YW-uiy8qul8T2Mi7N9r1IM2ZU07HaLQFNFOB3vBV_jW9oCa",
    content: {
      en: {
        title: "Multi-Layer Neural Networks",
        points: [
          "Also known as Deep Feedforward Networks.",
          "They consist of an input layer, one or more hidden layers, and an output layer.",
          "Capable of learning non-linear relationships."
        ]
      },
      ar: {
        title: "الشبكات العصبية متعددة الطبقات",
        points: [
          "تُعرف أيضًا باسم شبكات التغذية الأمامية العميقة.",
          "تتكون من طبقة إدخال، وطبقة مخفية واحدة أو أكثر، وطبقة إخراج.",
          "قادرة على تعلم العلاقات غير الخطية."
        ]
      }
    }
  }
];

const SlidesShowPage = () => {
  const [selectedSlideId, setSelectedSlideId] = useState(3);
  const [language, setLanguage] = useState('split');

  const selectedSlide = MOCK_SLIDES.find(s => s.id === selectedSlideId);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = MOCK_SLIDES.findIndex(s => s.id === selectedSlideId);
        if (currentIndex > 0) {
          setSelectedSlideId(MOCK_SLIDES[currentIndex - 1].id);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = MOCK_SLIDES.findIndex(s => s.id === selectedSlideId);
        if (currentIndex < MOCK_SLIDES.length - 1) {
          setSelectedSlideId(MOCK_SLIDES[currentIndex + 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedSlideId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--color-bg-light)' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <SlideList 
            slides={MOCK_SLIDES} 
            selectedId={selectedSlideId} 
            onSelect={setSelectedSlideId} 
        />
        <SlideViewer 
            slide={selectedSlide} 
            language={language} 
        />
        <RightPanel 
            language={language} 
            setLanguage={setLanguage} 
        />
      </div>
    </div>
  );
};

export default SlidesShowPage;