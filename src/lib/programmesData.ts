export interface ProgrammeDetail {
  title: string;
  description: string;
  longDescription: string;
  stats: string;
  objectives: string[];
  impact: string[];
}

export const programmesData: Record<string, Record<'en' | 'te', ProgrammeDetail>> = {
  children: {
    en: {
      title: "Children's Home",
      description: "Safe residential care with structured routines, discipline, and a loving family environment for orphaned and semi-orphaned children aged 4–12.",
      longDescription: "Our residential home in Nagole, Uppal Mandal, provides a loving, safe, and nurturing sanctuary for orphaned, abandoned, and semi-orphaned children. We believe every child deserves a secure home where they can grow with dignity, care, and education. We provide comprehensive physical, educational, emotional, and social development support.",
      stats: "120+ children supported since inception",
      objectives: [
        "Provide 24/7 safe accommodation and supervision under caring wardens.",
        "Ensure three nutritious, balanced meals daily, custom-planned for growing children.",
        "Enrol children in reputed local English-medium private schools to secure their academic future.",
        "Offer dedicated after-school tuition and digital literacy classes in our computer lab."
      ],
      impact: [
        "100% school enrollment and attendance rate.",
        "Daily healthcare checkups and emotional counseling support.",
        "Regular extracurricular activities, including yoga, music, and moral science lessons."
      ]
    },
    te: {
      title: "పిల్లల హోమ్",
      description: "4-12 సంవత్సరాల వయస్సు గల అనాథ మరియు నిరుపేద పిల్లలకు నిర్మాణాత్మక దినచర్యలు, క్రమశిక్షణ మరియు ప్రేమపూర్వక కుటుంబ వాతావరణంతో కూడిన సురక్షితమైన నివాస సంరక్షణ.",
      longDescription: "నాగోల్, ఉప్పల్ మండల్‌లోని మా నివాస గృహం అనాథలు, విడిచిపెట్టబడిన మరియు నిరుపేద పిల్లలకు ప్రేమపూర్వకమైన, సురక్షితమైన మరియు అనుకూలమైన ఆశ్రయాన్ని అందిస్తుంది. ప్రతి బిడ్డకు గౌరవం, సంరక్షణ మరియు విద్యతో ఎదగడానికి సురక్షితమైన ఇల్లు లభించాలని మేము నమ్ముతున్నాము. మేము సమగ్ర శారీరక, విద్యాపరమైన, మానసిక మరియు సామాజిక అభివృద్ధికి మద్దతు అందిస్తాము.",
      stats: "ప్రారంభం నుండి 120+ పిల్లలకు మద్దతు",
      objectives: [
        "సంరక్షణ మరియు పర్యవేక్షణతో కూడిన 24/7 సురక్షితమైన నివాస వసతి.",
        "పెరిగే పిల్లల కోసం రోజుకు 3 సార్లు సమతుల్య, పోషకమైన ఆహారం.",
        "స్థానిక ఇంగ్లీష్ మీడియం ప్రైవేట్ పాఠశాలల్లో పిల్లలను చేర్పించి నాణ్యమైన విద్య అందించడం.",
        "పాఠశాల తర్వాత ప్రత్యేక ట్యూషన్ మరియు కంప్యూటర్ ల్యాబ్‌లో డిజిటల్ అక్షరాస్యత తరగతులు."
      ],
      impact: [
        "100% పాఠశాల నమోదు మరియు హాజరు శాతం.",
        "రోజువారీ ఆరోగ్య పరీక్షలు మరియు మానసిక కౌన్సిలింగ్ మద్దతు.",
        "యోగ, సంగీతం మరియు నైతిక విలువల క్లాసులతో కూడిన పాఠ్యేతర కార్యకలాపాలు."
      ]
    }
  },
  education: {
    en: {
      title: "Education Support",
      description: "Complete educational assistance including school enrolment, uniforms, stationery, tuition, and computer literacy for underserved children.",
      longDescription: "We believe education is the key to breaking the cycle of poverty. Our Education Support programme bridges the gap for children in marginalised communities who cannot afford basic schooling requirements. By funding fees, books, uniforms, and local tuitions, we keep children in school and prevent dropouts.",
      stats: "500+ students supported",
      objectives: [
        "Distribute yearly study kits including textbooks, notebooks, stationery, bags, and uniforms.",
        "Fund tuition fees for underprivileged children studying in government and private schools.",
        "Set up local free study circles and after-school tuition centers run by qualified tutors.",
        "Deliver basic computer literacy training to prepare students for the modern digital era."
      ],
      impact: [
        "Drastic reduction in school dropout rates in targeted communities.",
        "Improved academic performance and higher secondary board exam pass percentages.",
        "Empowered students pursuing higher education and vocational courses."
      ]
    },
    te: {
      title: "విద్యా సహాయం",
      description: "వెనుకబడిన పిల్లల కోసం పాఠశాల నమోదు, యూనిఫాంలు, స్టేషనరీ, ట్యూషన్ మరియు కంప్యూటర్ పరిజ్ఞానంతో కూడిన పూర్తి విద్యా సహాయం.",
      longDescription: "పేదరికం నుండి బయటపడటానికి విద్యే ప్రధాన మార్గమని మేము నమ్ముతున్నాము. మా విద్యా సహాయ కార్యక్రమం ప్రాథమిక పాఠశాల అవసరాలను భరించలేని వెనుకబడిన వర్గాల పిల్లలకు సహాయం అందిస్తుంది. ఫీజులు, పుస్తకాలు, యూనిఫాంలు మరియు స్థానిక ట్యూషన్లను భరించడం ద్వారా మేము పిల్లలు పాఠశాల మానకుండా చూస్తాము.",
      stats: "500+ విద్యార్థులకు మద్దతు",
      objectives: [
        "పాఠ్యపుస్తకాలు, నోట్‌బుక్‌లు, స్టేషనరీ, బ్యాగులు మరియు యూనిఫాంలతో కూడిన వార్షిక స్టడీ కిట్‌ల పంపిణీ.",
        "ప్రభుత్వ మరియు ప్రైవేట్ పాఠశాలల్లో చదువుతున్న నిరుపేద పిల్లలకు ట్యూషన్ ఫీజుల చెల్లింపు.",
        "అర్హులైన ఉపాధ్యాయులతో స్థానిక ఉచిత స్టడీ సర్కిల్స్ మరియు పాఠశాల అనంతర ట్యూషన్ కేంద్రాల ఏర్పాటు.",
        "ఆధునిక డిజిటల్ యుగం కోసం విద్యార్థులను సిద్ధం చేయడానికి ప్రాథమిక కంప్యూటర్ పరిజ్ఞాన శిక్షణ."
      ],
      impact: [
        "లక్షిత ప్రాంతాలలో పాఠశాల మధ్యలోనే ఆపేసే పిల్లల సంఖ్య గణనీయంగా తగ్గింది.",
        "మెరుగైన విద్యా పనిచేరు మరియు పదవ తరగతి పరీక్షలలో ఉత్తీర్ణత శాతం పెంపు.",
        "ఉన్నత విద్య మరియు వృత్తి విద్యా కోర్సులు అభ్యసిస్తున్న విద్యార్థులు."
      ]
    }
  },
  women: {
    en: {
      title: "Women's Development",
      description: "Empowering women through Self-Help Groups (SHGs), skill training, microfinance access, and community leadership development.",
      longDescription: "When you empower a woman, you change a whole family. Our Women's Development initiative establishes Self-Help Groups (SHGs) to build financial literacy, savings habits, and mutual support. We provide vocational training in tailoring, embroidery, and handicrafts to foster entrepreneurship and self-reliance.",
      stats: "15+ active SHGs",
      objectives: [
        "Form and nurture Self-Help Groups (SHGs) for collective savings and financial independence.",
        "Provide certified vocational training courses in tailoring, fashion design, and small businesses.",
        "Facilitate access to low-interest microfinance bank loans for women starting micro-enterprises.",
        "Conduct workshops on women's legal rights, reproductive health, and gender equality."
      ],
      impact: [
        "Over 150 women actively earning a sustainable livelihood through local businesses.",
        "Enhanced decision-making power for women within their households and communities.",
        "Increased savings buffer for families to handle health and educational emergency expenses."
      ]
    },
    te: {
      title: "మహిళా సాధికారత",
      description: "స్వయం సహాయక బృందాలు (SHGs), నైపుణ్య శిక్షణ, మైక్రోఫైనాన్స్ యాక్సెస్ మరియు కమ్యూనిటీ నాయకత్వ అభివృద్ధి ద్వారా మహిళలను సాధికారపరచడం.",
      longDescription: "ఒక మహిళకు సాధికారత లభిస్తే, ఆ కుటుంబం అంతా అభివృద్ధి చెందుతుంది. మా మహిళా సాధికారత కార్యక్రమం స్వయం సహాయక బృందాలను (SHGs) ఏర్పాటు చేసి ఆర్థిక అక్షరాస్యత, పొదుపు అలవాట్లు మరియు పరస్పర మద్దతును పెంపొందిస్తుంది. మేము కుట్టుపని, ఎంబ్రాయిడరీ మరియు హస్తకళలలో వృత్తి విద్యా శిక్షణను అందించి వారిని స్వయం సమృద్ధి గలవారిగా తీర్చిదిద్దుతాము.",
      stats: "15+ క్రియాశీల స్వయం సహాయక బృందాలు",
      objectives: [
        "ఉమ్మడి పొదుపు మరియు ఆర్థిక స్వాతంత్ర్యం కోసం స్వయం సహాయక బృందాల (SHGs) ఏర్పాటు.",
        "కుట్టుపని, ఫ్యాషన్ డిజైనింగ్ మరియు కుటీర పరిశ్రమలపై ధృవీకరించబడిన వృత్తి శిక్షణ కోర్సులు.",
        "సూక్ష్మ పరిశ్రమలు ప్రారంభించే మహిళల కోసం తక్కువ వడ్డీతో కూడిన మైక్రోఫైనాన్స్ బ్యాంక్ రుణాల సౌకర్యం.",
        "మహిళల చట్టపరమైన హక్కులు, ప్రత్యుత్పత్తి ఆరోగ్యం మరియు లింగ సమానత్వంపై వర్క్‌షాపులు."
      ],
      impact: [
        "స్థానిక వ్యాపారాల ద్వారా 150 మందికి పైగా మహిళలు స్థిరమైన జీవనోపాధి పొందుతున్నారు.",
        "కుటుంబాలలో మరియు సమాజంలో మహిళల నిర్ణయాధికారం పెరిగింది.",
        "ఆరోగ్య మరియు విద్యా అత్యవసర ఖర్చులను ఎదుర్కోవడానికి కుటుంబాల పొదుపు పెరిగింది."
      ]
    }
  },
  hiv: {
    en: {
      title: "HIV/AIDS Awareness",
      description: "Community-level awareness campaigns, testing facilitation, de-stigmatisation drives, and support for affected individuals and families.",
      longDescription: "Awareness is the first step toward prevention and support. We work to break the stigma surrounding HIV/AIDS in remote and low-income communities. We offer awareness seminars, run safe testing camps, and provide direct nutritional and educational support to children of affected families.",
      stats: "5,000+ lives reached",
      objectives: [
        "Organise community awareness campaigns and street plays to debunk myths and reduce stigma.",
        "Provide access to free, confidential HIV testing and counseling in coordination with local clinics.",
        "Support families with nutrition kits (containing ragi, pulses, and vitamins) to boost immunity.",
        "Guarantee school tuition sponsorships for children belonging to HIV-impacted families."
      ],
      impact: [
        "Significant reduction in local discrimination against HIV-positive individuals.",
        "Early detection and regular referral to Government ART (Anti-Retroviral Therapy) centers.",
        "Nutritional stability and education continuation for affected children."
      ]
    },
    te: {
      title: "HIV/AIDS అవగాహన",
      description: "సమాజ స్థాయిలో అవగాహన కార్యక్రమాలు, ఉచిత పరీక్షల నిర్వహణ, సామాజిక వివక్షత నిర్మూలన మరియు బాధితులకు మద్దతు.",
      longDescription: "నివారణ మరియు మద్దతు దిశగా అవగాహన మొదటి అడుగు. మేము వెనుకబడిన ప్రాంతాలలో HIV/AIDS కి సంబంధించిన వివక్షతను తొలగించడానికి కృషి చేస్తున్నాము. మేము అవగాహన సదస్సులు నిర్వహిస్తాము, ఉచిత పరీక్షల శిబిరాలు నిర్వహిస్తాము మరియు బాధిత కుటుంబాల పిల్లలకు పోషకాహారం మరియు విద్యా సహాయాన్ని అందిస్తాము.",
      stats: "5,000+ మందికి చేరిన అవగాహన",
      objectives: [
        "నమ్మకాలను తొలగించడానికి మరియు వివక్షను తగ్గించడానికి అవగాహన ప్రచారాలు మరియు వీధి నాటకాల నిర్వహణ.",
        "స్థానిక క్లినిక్‌ల సమన్వయంతో ఉచిత, అత్యంత గోప్యమైన HIV పరీక్షలు మరియు కౌన్సిలింగ్.",
        "రోగనిరోధక శక్తిని పెంచడానికి పోషకాహార కిట్‌ల (రాగులు, పప్పుధాన్యాలు, విటమిన్లు) పంపిణీ.",
        "HIV ప్రభావిత కుటుంబాలకు చెందిన పిల్లలకు పాఠశాల ట్యూషన్ల స్పాన్సర్‌షిప్ హామీ."
      ],
      impact: [
        "HIV-పాజిటివ్ వ్యక్తుల పట్ల స్థానిక వివక్షత గణనీయంగా తగ్గింది.",
        "ముందస్తు గుర్తింపు మరియు ప్రభుత్వ ART (యాంటీ-రెట్రోవైరల్ థెరపీ) కేంద్రాలకు క్రమం తప్పకుండా పంపడం.",
        "బాధిత పిల్లలకు పోషకాహార స్థిరత్వం మరియు విద్య కొనసాగింపు."
      ]
    }
  },
  environment: {
    en: {
      title: "Environmental Protection",
      description: "Tree plantation drives, clean-up campaigns, and awareness programmes promoting environmental sustainability in local communities.",
      longDescription: "A healthy environment is key to a healthy community. Our environmental wing works to create greener neighborhoods, manage waste effectively, and educate children on climate change and eco-friendly lifestyles. Through plantation drives and cleanups, we foster a deep sense of civic responsibility.",
      stats: "Ongoing local initiatives",
      objectives: [
        "Organise periodic tree plantation drives in schools, public parks, and urban spaces.",
        "Conduct cleanliness and waste segregation workshops in residential colonies.",
        "Promote rain-water harvesting systems and eco-friendly alternatives to single-use plastics.",
        "Incorporate eco-clubs in our children's home to teach gardening and composting."
      ],
      impact: [
        "Planted and nurtured hundreds of saplings in Nagole and surrounding areas.",
        "Increased awareness of waste management and recycling among local residents.",
        "Active participation of children in environmental protection activities."
      ]
    },
    te: {
      title: "పర్యావరణ పరిరక్షణ",
      description: "చెట్ల పెంపకం ప్రచారాలు, పరిశుభ్రత కార్యక్రమాలు మరియు స్థానిక సమాజాలలో పర్యావరణ పరిరక్షణ అవగాహన.",
      longDescription: "ఆరోగ్యకరమైన పర్యావరణమే ఆరోగ్యకరమైన సమాజానికి మూలం. మా పర్యావరణ విభాగం పరిసరాలను పచ్చదనంతో నింపడానికి, व्यర్థాలను సమర్థవంతంగా నిర్వహించడానికి మరియు పిల్లలకు పర్యావరణ అనుకూల జీవనశైలి గురించి బోధించడానికి కృషి చేస్తుంది. మొక్కలు నాటడం మరియు క్లీన్-అప్ డ్రైవ్‌ల ద్వారా మేము పౌర బాధ్యతను పెంపొందిస్తాము.",
      stats: "నిరంతర స్థానిక కార్యక్రమాలు",
      objectives: [
        "పాఠశాలలు, ప్రభుత్వ పార్కులు మరియు పట్టణ ప్రాంతాలలో క్రమబద్ధమైన మొక్కలు నాటే కార్యక్రమాలు.",
        "निవాస కాలనీలలో పరిశుభ్రత మరియు వ్యర్థాల వర్గీకరణపై వర్క్‌షాప్‌ల నిర్వహణ.",
        "వర్షపు నీటి నిల్వ వ్యవస్థలు మరియు ప్లాస్టిక్ ప్రత్యామ్నాయాల వాడకాన్ని ప్రోత్సహించడం.",
        "పిల్లల హోమ్‌లో గార్డెనింగ్ మరియు కంపోస్టింగ్ బోధించడానికి ఎకో-క్లబ్‌ల ఏర్పాటు."
      ],
      impact: [
        "నాగోల్ మరియు పరిసర ప్రాంతాలలో వందలాది మొక్కలను నాటి పెంచడం.",
        "స్థానిక నివాసితులలో వ్యర్థాల నిర్వహణ మరియు రీసైక్లింగ్ గురించి అవగాహన పెంపు.",
        "పర్యావరణ పరిరక్షణ కార్యక్రమాలలో పిల్లల క్రియాశీల భాగస్వామ్యం."
      ]
    }
  },
  aged: {
    en: {
      title: "Care for the Aged",
      description: "Planned residential homes for elderly men and women without family support, ensuring dignity, medical care, and companionship.",
      longDescription: "Nobody should be left alone or neglected in their twilight years. Our upcoming Care for the Aged initiative is designed to build a free, peaceful, and fully-equipped residential facility for elderly citizens who have been abandoned or lack family support. We aim to provide nutritional support, complete healthcare, and a sense of family.",
      stats: "Coming Soon (Infrastructure phase)",
      objectives: [
        "Construct a dedicated, barrier-free residential facility for elderly citizens.",
        "Provide 24/7 care, balanced meals, and regular specialized health checkups.",
        "Facilitate interactions with our children's home to foster intergenerational joy.",
        "Offer psychological counselling, recreational activities, and spiritual support."
      ],
      impact: [
        "Initial fundraising and land planning for the facility are underway.",
        "Community identification of elderly individuals requiring priority rehabilitation.",
        "Aiming to rehabilitate 50+ elderly citizens in the first phase."
      ]
    },
    te: {
      title: "వృద్ధుల సంరక్షణ",
      description: "కుటుంబ మద్దతు లేని వృద్ధుల కోసం ఉచిత నివాసం, గౌరవప్రదమైన జీవనం, వైద్య సంరక్షణ మరియు స్నేహపూర్వక వాతావరణం.",
      longDescription: "జీవిత చరమాంకంలో ఎవరూ ఒంటరిగా మిగిలిపోకూడదు లేదా నిర్లక్ష్యం చేయబడకూడదు. మా రాబోయే వృద్ధుల సంరక్షణ కార్యక్రమం అనాథలు లేదా కుటుంబ మద్దతు లేని వృద్ధుల కోసం ఉచిత, ప్రశాంతమైన మరియు పూర్తి సదుపాయాలు గల నివాసాన్ని నిర్మించడానికి రూపొందించబడింది. మేము వారికి పోషకాహారం, వైద్య సేవలు మరియు కుటుంబ వాతావరణాన్ని అందించాలని లక్ష్యంగా పెట్టుకున్నాము.",
      stats: "త్వరలో అందుబాటులోకి వస్తుంది (నిర్మాణ దశలో ఉంది)",
      objectives: [
        "వృద్ధుల కోసం ప్రత్యేకమైన, అన్ని వసతులు గల నివాస భవనం నిర్మించడం.",
        "24/7 సంరక్షణ, సమతుల్య భోజనం మరియు క్రమబద్ధమైన ప్రత్యేక వైద్య పరీక్షలు.",
        "పరస్పర ఆనందం కోసం మా పిల్లల హోమ్ పిల్లలతో సంప్రదింపుల సౌకర్యం.",
        "మానసిక కౌన్సిలింగ్, వినోద కార్యక్రమాలు మరియు ఆధ్యాత్మిక మద్దతును అందించడం.",
      ],
      impact: [
        "ఈ సదుపాయం కోసం ప్రారంభ నిధుల సేకరణ మరియు భూమి ప్రణాళిక పనులు జరుగుతున్నాయి.",
        "ప్రాధాన్య పునరావాసం అవసరమైన వృద్ధులను గుర్తించే ప్రక్రియ.",
        "మొదటి దశలో 50 మందికి పైగా వృద్ధులకు పునరావాసం కల్పించడమే లక్ష్యం."
      ]
    }
  }
};
