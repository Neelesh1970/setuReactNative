export const allSchemes = [
    // --- Agriculture Related Schemes ---
  
    {
      id: '1',
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      launchedBy: 'Launched by Prime Minister Narendra Modi on 24 February 2019',
      objective: 'Income support of ₹6,000 per year to all farmer families across the country in three equal installments.',
      keyFeatures: [
        { icon: '💵', title: 'Direct Transfer', desc: '₹2,000 per installment, 3 times a year' },
        { icon: '🌱', title: 'For Farmers', desc: 'All small and marginal farmer families' },
        { icon: '📝', title: 'Easy Application', desc: 'Apply online or via local authorities' },
        { icon: '🕒', title: 'Quick Process', desc: 'Funds directly transferred to bank accounts' }
      ],
      impact: [
        { indicator: 'Total Beneficiary Farmers', figure: 'Over 11 crore' },
        { indicator: 'Total Amount Transferred', figure: 'Over ₹2.81 lakh crore' },
        { indicator: 'Annual Benefit', figure: '₹6,000 per year' },
        { indicator: 'Installments', figure: '3 per year' }
      ],
      documentsRequired: [
        'Aadhaar Card',
        'Landholding papers',
        'Bank account details',
        'Aadhaar linked mobile number'
      ],
      officialLink: 'https://pmkisan.gov.in/',
      learnMoreLink: 'https://pmkisan.gov.in/FAQ.aspx',
      category: '1',
    },
    {
      id: '2',
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      launchedBy: 'Launched by Prime Minister Narendra Modi on 18 February 2016',
      objective: 'Provides comprehensive insurance coverage against crop failure to help farmers cope with agricultural risks.',
      keyFeatures: [
        { icon: '🌾', title: 'Low Premium', desc: '2% for Kharif, 1.5% for Rabi, 5% for commercial crops' },
        { icon: '📱', title: 'Technology Driven', desc: 'Mobile and remote-sensing for faster claim settlement' },
        { icon: '💸', title: 'Direct Transfer', desc: 'Claims paid directly into bank accounts' },
        { icon: '🛡️', title: 'Wide Coverage', desc: 'Pre/post-harvest and prevented sowing risks' }
      ],
      impact: [
        { indicator: 'Farmers Covered', figure: 'Over 6 crore (FY 2022-23)' },
        { indicator: 'Claims Paid', figure: 'Over ₹1.36 lakh crore (since inception)' },
        { indicator: 'Premium Subsidy', figure: 'No upper limit on subsidy' }
      ],
      documentsRequired: [
        'Land records (Khatauni/Khasra/Girdawari)',
        'Aadhaar Card',
        'Bank account details',
        'Sowing declaration'
      ],
      officialLink: 'https://pmfby.gov.in/',
      learnMoreLink: 'https://pmfby.gov.in/pdf/PMFBY-Guidelines.pdf',
      category: '1',
    },
    {
      id: '3',
      name: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
      launchedBy: 'Launched by Prime Minister Narendra Modi on 1 July 2015',
      objective: 'Aims to enhance access of water on farm, expand cultivable area under assured irrigation, improve water use efficiency, and promote sustainable water conservation practices.',
      keyFeatures: [
        { icon: '💧', title: 'Har Khet ko Pani', desc: 'Water to every field' },
        { icon: '💦', title: 'Per Drop More Crop', desc: 'Promotes micro-irrigation' },
        { icon: '🔗', title: 'Integrated Approach', desc: 'Water source, distribution, efficient use' },
        { icon: '📈', title: 'Water Use Efficiency', desc: 'Focus on sustainable water management' }
      ],
      impact: [
        { indicator: 'Coverage', figure: 'All states & UTs' },
        { indicator: 'Micro Irrigation Area', figure: 'Over 100 lakh ha (till 2022)' }
      ],
      documentsRequired: [
        'Land ownership documents',
        'Aadhaar Card',
        'Bank account details',
        'Project report (for group projects)'
      ],
      officialLink: 'https://pmksy.gov.in/',
      learnMoreLink: 'https://pmksy.gov.in/AboutPMKSY.aspx',
      category: '1',
    },
  
    // --- Rural & Environment Related Schemes ---
  
    {
      id: '4',
      name: 'Pradhan Mantri Awas Yojana - Gramin (PMAY-G)',
      launchedBy: 'Launched by Prime Minister Narendra Modi on 20 November 2016',
      objective: 'To provide a pucca house with basic amenities to all houseless households and those living in kutcha and dilapidated houses in rural areas by 2024.',
      keyFeatures: [
        { icon: '🏠', title: 'Financial Assistance', desc: '₹1.20 lakh in plain & ₹1.30 lakh in hilly areas' },
        { icon: '👷', title: 'Wage Labour', desc: '90-95 days of unskilled wage labor under MGNREGA' },
        { icon: '🚻', title: 'Toilets', desc: '₹12,000 assistance for toilets' },
        { icon: '🔌', title: 'Convergence', desc: 'LPG, electricity, and other schemes' }
      ],
      impact: [
        { indicator: 'Houses Completed', figure: 'Over 2 crore' },
        { indicator: 'Avg. Construction Time', figure: 'Less than 120 days' }
      ],
      documentsRequired: [
        'Aadhaar Card',
        'SECC 2011 data reference',
        'Bank account details',
        'Land ownership documents'
      ],
      officialLink: 'https://pmayg.nic.in/',
      learnMoreLink: 'https://pmayg.nic.in/netiayHome/home.aspx',
      category: '2',
    },
    {
      id: '5',
      name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
      launchedBy: 'Launched on 2 February 2006',
      objective: 'Enhances livelihood security by providing at least 100 days of guaranteed wage employment in a financial year to every rural household.',
      keyFeatures: [
        { icon: '💼', title: 'Guaranteed Employment', desc: '100 days wage employment per year' },
        { icon: '👩', title: 'Women Participation', desc: 'At least one-third of beneficiaries are women' },
        { icon: '⏰', title: 'Timely Payment', desc: 'Wage payment within 15 days' },
        { icon: '📜', title: 'Unemployment Allowance', desc: 'If work not provided within 15 days' }
      ],
      impact: [
        { indicator: 'Total Households Worked', figure: 'Over 5 crore (FY 2022-23)' },
        { indicator: 'Total Expenditure', figure: 'Over ₹1.2 lakh crore (FY 2022-23)' }
      ],
      documentsRequired: [
        'Aadhaar Card',
        'Job Card',
        'Bank account details',
        'Muster roll attendance'
      ],
      officialLink: 'https://nrega.nic.in/',
      learnMoreLink: 'https://nrega.nic.in/MGNREGA_new/Nrega_home.aspx',
      category: '2',
    },
  
    // --- Banking & Financial Services ---
  
    {
      id: '6',
      name: 'Pradhan Mantri Jan Dhan Yojana (PMJDY)',
      launchedBy: 'Launched by Prime Minister Narendra Modi on 28 August 2014',
      objective: 'To ensure financial inclusion by providing universal access to banking facilities, especially for the economically weaker sections and those in rural areas.',
      keyFeatures: [
        { icon: '🏦', title: 'Zero Balance Account', desc: 'No minimum balance required' },
        { icon: '💳', title: 'RuPay Debit Card', desc: 'Issued to every account holder' },
        { icon: '💰', title: 'Overdraft Facility', desc: 'Up to ₹10,000 after 6 months' },
        { icon: '🛡️', title: 'Accident Insurance', desc: '₹1 lakh (₹2 lakh post-2018)' },
        { icon: '👨‍👩‍👧‍👦', title: 'Life Insurance', desc: '₹30,000 for eligible holders' },
        { icon: '➡️', title: 'Direct Benefit Transfers (DBT)', desc: 'LPG, pensions, scholarships etc.' }
      ],
      impact: [
        { indicator: 'Total PMJDY Accounts', figure: 'Over 49 crore' },
        { indicator: 'Total Deposit Balance', figure: 'Over ₹1,98,000 crore' },
        { indicator: 'RuPay Cards Issued', figure: 'Over 33 crore' },
        { indicator: 'Women Account Holders', figure: 'Approx. 56%' }
      ],
      documentsRequired: [
        'Aadhaar Card',
        'Address proof',
        'Passport-size photograph'
      ],
      officialLink: 'https://pmjdy.gov.in/',
      learnMoreLink: 'https://pmjdy.gov.in/scheme',
      category: '3',
    },
    {
      id: '7',
      name: 'Pradhan Mantri Mudra Yojana (PMMY)',
      launchedBy: 'Launched on 8 April 2015',
      objective: 'Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.',
      keyFeatures: [
        { icon: '💸', title: 'Shishu', desc: 'Loans up to ₹50,000' },
        { icon: '🌱', title: 'Kishor', desc: 'Loans from ₹50,001 to ₹5 lakh' },
        { icon: '🏢', title: 'Tarun', desc: 'Loans from ₹5 lakh to ₹10 lakh' },
        { icon: '🆓', title: 'No Collateral', desc: 'No collateral security required' }
      ],
      impact: [
        { indicator: 'Total Sanctions', figure: 'Over ₹15 lakh crore (till FY 2023)' },
        { indicator: 'Beneficiaries', figure: 'Over 37 crore' }
      ],
      documentsRequired: [
        'Business plan/proposal',
        'Identity and address proof',
        'Bank account details'
      ],
      officialLink: 'https://www.mudra.org.in/',
      learnMoreLink: 'https://www.mudra.org.in/Home/PMMYGuidelines',
      category: '3',
    },
    {
      id: '8',
      name: 'Sukanya Samriddhi Yojana (SSY)',
      launchedBy: 'Launched on 22 January 2015',
      objective: 'Small savings scheme for girl child, offering attractive interest rate and tax benefits.',
      keyFeatures: [
        { icon: '👧', title: 'For Girl Child', desc: '0-10 years opening age' },
        { icon: '📈', title: 'High Interest', desc: 'Interest rate higher than other small savings' },
        { icon: '💰', title: 'Tax Benefit', desc: 'Exempted under Section 80C' },
        { icon: '🏦', title: 'Deposits', desc: 'Minimum ₹250/year, maximum ₹1.5 lakh/year' }
      ],
      impact: [
        { indicator: 'Accounts Opened', figure: 'Over 2.5 crore (2023)' }
      ],
      documentsRequired: [
        'Birth certificate of girl child',
        'Aadhaar Card',
        'Parent/guardian\'s identity proof'
      ],
      officialLink: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89',
      learnMoreLink: 'https://www.india.gov.in/spotlight/sukanya-samriddhi-yojana',
      category: '3',
    },
  
    // --- Business & Entrepreneurship ---
  
    {
      id: '9',
      name: 'Startup India',
      launchedBy: 'Launched on 16 January 2016',
      objective: 'Action plan to boost startup businesses and entrepreneurs in India.',
      keyFeatures: [
        { icon: '🚀', title: 'Recognition', desc: 'Easy startup recognition process' },
        { icon: '💼', title: 'Tax Exemption', desc: '3 years tax exemption in a block of 7 years' },
        { icon: '💸', title: 'Fund Support', desc: '₹10,000 crore Fund of Funds' }
      ],
      impact: [
        { indicator: 'Recognized Startups', figure: 'Over 1 lakh (2023)' }
      ],
      documentsRequired: [
        'Company registration',
        'Business plan',
        'Startup India portal registration'
      ],
      officialLink: 'https://www.startupindia.gov.in/',
      learnMoreLink: 'https://www.startupindia.gov.in/content/sih/en/about_startup_india.html',
      category: '4',
    },
    {
      id: '10',
      name: 'Stand Up India',
      launchedBy: 'Launched on 5 April 2016',
      objective: 'Bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs.',
      keyFeatures: [
        { icon: '👩', title: 'Women Empowerment', desc: 'Loans for women entrepreneurs' },
        { icon: '🧑🏽‍🎓', title: 'SC/ST Upliftment', desc: 'Loans for SC/ST entrepreneurs' },
        { icon: '🏦', title: 'Collateral Free', desc: 'No collateral security required' }
      ],
      impact: [
        { indicator: 'Total Loans', figure: 'Over ₹40,000 crore (2023)' }
      ],
      documentsRequired: [
        'Caste certificate',
        'Identity and address proof',
        'Bank account details'
      ],
      officialLink: 'https://www.standupmitra.in/',
      learnMoreLink: 'https://www.standupmitra.in/Home/SUISchemes',
      category: '4',
    },
  
    // --- Health & Wellness ---
  
    {
      id: '11',
      name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
      launchedBy: 'Launched on 23 September 2018',
      objective: 'Health insurance scheme providing coverage of ₹5 lakhs per family per year.',
      keyFeatures: [
        { icon: '🏥', title: 'Insurance Cover', desc: '₹5 lakh per family per year' },
        { icon: '👨‍👩‍👧‍👦', title: 'Family Floater', desc: 'Covers all family members' },
        { icon: '🆓', title: 'Cashless', desc: 'Cashless & paperless treatment in empaneled hospitals' }
      ],
      impact: [
        { indicator: 'Beneficiary Families', figure: 'Over 10 crore' },
        { indicator: 'Hospitals Empaneled', figure: 'Over 24,000' }
      ],
      documentsRequired: [
        'Aadhaar Card',
        'Ration Card',
        'Family ID'
      ],
      officialLink: 'https://pmjay.gov.in/',
      learnMoreLink: 'https://pmjay.gov.in/about/pmjay',
      category: '6',
    },
  
    // --- Education & Learning ---
  
    {
      id: '12',
      name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)',
      launchedBy: 'Launched on 15 July 2015',
      objective: 'Skill development initiative providing industry-relevant training to youth.',
      keyFeatures: [
        { icon: '🧑‍🎓', title: 'Skill Training', desc: 'Free skill training programs' },
        { icon: '📜', title: 'Certification', desc: 'Certification upon course completion' },
        { icon: '💼', title: 'Job Placement', desc: 'Linkage with industry for placement' }
      ],
      impact: [
        { indicator: 'Youth Trained', figure: 'Over 1 crore' }
      ],
      documentsRequired: [
        'Aadhaar Card',
        'Identity proof',
        'Education certificate'
      ],
      officialLink: 'https://www.pmkvyofficial.org/',
      learnMoreLink: 'https://www.pmkvyofficial.org/home-page',
      category: '5',
    },
  ];
  