const express = require('express');
const path = require('path');
const { Client } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const saltRounds = 10;

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'hackviolet',
    password: 'Danny@vt26',
    port: 5432,
  });
  
  // Connect to the PostgreSQL database
  db.connect()

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the directory for views
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('/public'));

// Array of Javascript objects to store data regarding each week of pregnancy
let weeks = [
    {
        week: 2,
        babyDevelopment: 'At two weeks, the egg is a few days old, as conception occurred the same week since due dates are determined by the last menstrual period. The uterus experiences an increase in the hormones estrogen and progesterone. The hormones activate the endometrium, the uterus lining, to thicken, creating a womb, able to support the fertilized egg.',
        pregnancySymptoms: ['Slippery cervical mucus - cervical mucus (vaginal discharge) will be clear, slippery, and stretchy', 'Mild cramping - mild cramps or sharp pains will occur in the abdomen', 'Increased sex drive - rise in sex drive', 'Heightened sense of smell - a sense of smell gets stronger and maybe sensitive to male pheromones', 'Tender breasts - hormonal changes may cause breasts to feel more full or sore', 'Cervical changes - the cervix will get softer, higher, wetter, and more open', 'Boost in basal body temperature (BBT) - the lowest body temperature at rest will increase'],
        pregnancyChecklist: ['Take vitamins - take prenatal vitamins that have at least 400mcg of folic acid. Take also iron, vitamin D, and calcium supplements', 'Book an appointment with a Healthcare Provider - visit a healthcare provider to get more information about your pregnancy and body', 'Have Frequent Sex - having sex regularly can help ensure fertilization', 'Research - research what foods are nitrous during pregnancy, and start taking care of your mental health and physical well-being', 'Prepare the body for Pregnancy - try weight training and yoga to help strengthen the core, and always consult with a health professional about what exercises are best for you'],
        images: ["https://assets.babycenter.com/ims/2018/06/pregnancy-week-2-fertilization_square.png",
            "https://assets.babycenter.com/ims/2023/01/2-weeks-baby-in-body-jan-2023_square.png"]
    },
    {
        week: 3,
        babyDevelopment: "At this stage, the egg is developing into a small ball of several hundred cells attaching to the lining of the uterus. The middle cells will form into the embryo, while the outer cells will development into the placenta.",
        pregnancySymptoms: [
            "Gas and bloating - progesterone will cause the muscles in the body to relax, causing the digestion system to slow down. This leads to gas and bloating.",
            "Sore Breasts - Breast may feel swollen, tender, or tingly; nipples may be more sensitive and uncomfortable",
            "Spotting - implantation bleeding may occur, when there is light bleeding. If there is pain with spotting contact a health professional",
            "Basal body temperature (BBT) stays high - the BBT will stay high throughout the week"
        ],
        pregnancyChecklist: [
            "Avoid overheating - avoid steam baths, hot tubs, and saunas, they cause an increase risk of neural tube defects in babies",
            "Monitor emotions - talk to others if stressed or worried, seek calming outlets",
            "Eat healthy meals and snacks - eat fruits, vegetables, low-mercury fish, whole grains; foods that include vitamin C, iron, and calcium",
            "Reduce coffee intake - limit caffeine intake to around one cup of coffee a day",
            "Seek help for quitting addictions - talk to a health professional about seeking a program or counselor to help with quitting smoking, drinking, or drug addictions",
            "Improve Sleep - create good sleeping habits for future months",
            "Ensure home and work environments are safe - talk to a health care provider if you work in an environment where you come in contact daily to chemicals, loud noises, radiation, or if you have to constantly stand or lift heavy objects."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-3-blastocycst_square.png',
            'https://assets.babycenter.com/ims/2023/01/3-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 4,
        babyDevelopment: "The embryo now consists of two layers known as the hypoblast and epiblast; they will start to form the baby’s organs for the following weeks. The baby is the size of a poppy seed.",
        pregnancySymptoms: [
            "Tender, swollen breasts - the breast will grow tender and the nipples will darken",
            "Fatigue - the large increase in progesterone may cause women to become exhausted",
            "Nausea/Vomiting - 80% of women will experience morning sickness, however it can occur at any part of the day",
            "Gas and Bloating - the rapid increase of progesterone also may make the digestive system relax, causing bloating and gas",
            "Cramping - if you feel cramps with spotting, you may need to contact a health professional",
            "Mood Swings - hormones, stress, and fatigue may all result in mood swings"
        ],
        pregnancyChecklist: [
            "Book a Prenatal Appointment - schedule a doctor's appointment to ensure your first weeks of pregnancy are going smoothly",
            "Ensure Medicine is safe for Pregnancy - check to see if the medicine is safe for pregnancy, contact a health provider if needed",
            "Soothe Digestive System - eat smaller meals, eat slower, chew food well, drink less water, avoid carbonated drinks, gum, or sorbitol if experiencing bloating or gas",
            "Research - research what may come for the rest of pregnancy and start to prepare"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-4-yolk-sac_square.png',
            'https://assets.babycenter.com/ims/2023/01/4-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 5,
        babyDevelopment: "The embryo is now consists of three layers: ectoderm, mesoderm, and endoderm; these layers will later form the organs and tissues The brain, spinal cord, and nerves are beginning to develop in the top layer of the embryo; the heart and circulatory system will start to develop in the mesoderm. The baby is the size of a sesame seed.",
        pregnancySymptoms: [
            "Frequent urination - the pregnancy hormones and the increase in blood volume will cause you to need to urinate more",
            "Tender, swollen breasts - the breast will feel swollen, sore, tingly, and sensitive",
            "Fatigue - the change in hormones may be the reason as to why you are so tired, so ensure you are getting plenty of sleep",
            "Spotting - about 25% of women experience spotting in the first trimester",
            "Morning sickness - changing your diet and lifestyle, natural remedies, and medications may reduce morning sickness symptoms",
            "Food aversions - the smell of foods may start you to feel sick at this point"
        ],
        pregnancyChecklist: [
            "Choose a Healthcare provider - find a healthcare provider to care for you throughout your pregnancy",
            "Create a family health history - look at the health history for both sides of the families to determine if there are any chronic conditions or genetic abnormalities in your family",
            "Take vitamins - taking vitamins is vital to get enough folic acid",
            "Reduce caffeine intake - limit caffeine intake to less than 200 mg per day or about one cup a day"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-5-amniotic-sac_square.png',
            'https://assets.babycenter.com/ims/2023/01/5-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 6,
        babyDevelopment: "At this stage of pregnancy, there is cardiac activity. There are also dark spots where the eyes and nostrils will start to develop, and small depressions mark where the baby’s ears will be. The arms and legs are small paddles; a small tail will also form which will eventually disappear. The baby is around the size of a lentil bean.",
        pregnancySymptoms: [
            "Morning sickness - morning sickness may occur at any part of the day",
            "Need to pee - the increase in blood in the body will cause the kidneys to process extra fluids, ensure you are hydrated",
            "Mood swings - hormonal changes, stress, and fatigue may cause mood swings",
            "Tender, swollen breasts - breasts may feel swollen, sore, tingly, and sensitive",
            "Fatigue - the hormonal changes may cause women to feel tired",
            "Metallic taste - there may be a metallic taste in your mouth due to the increase in estrogen",
            "Strange dreams - your dreams are trying to process the new changes that are rapidly occurring",
            "Headaches - ensure to get enough sleep, food, water, and exercise, all of which can reduce headaches. Acetaminophen is the recommended drug to take if feeling this symptom"
        ],
        pregnancyChecklist: [
            "Schedule Prenatal Visit - book an appointment with your doctor to discuss your health history, habits, and family health history",
            "Learn about Foods to avoid - learn about what foods are unsafe to consume during pregnancy",
            "Research Prenatal testing options - look at different testing options to determine the chances of your baby having Down syndrome or any other chromosomal difference",
            "Ensure work environment is safe - determine if the area you are working in is safe and that they",
            "Reduce stress - find outlets to help reduce stress",
            "Create a To-do list - create a to-do list of tasks and items you should get for your pregnancy"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-6-webbed-hands_square.png',
            'https://assets.babycenter.com/ims/2023/01/6-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 7,
        babyDevelopment: "This week marks significant development in your baby's vision and digestive system, with the main parts of the eye nearly fully formed shortly after their initial development, and the beginnings of the stomach, esophagus, liver, and pancreas. Additionally, the brain and spinal column have not only formed but are rapidly expanding, with the brain gaining an average of 250,000 cells per minute during pregnancy. The baby is the size of a blueberry.",
        pregnancySymptoms: [
            "Heightened sense of smell - Temporary increase, often causing aversion to familiar smells, linked to rising estrogen levels",
            "Food aversions - Sudden dislike for certain foods, another estrogen-related symptom, usually improves after the first trimester",
            "Frequent urination - Common early pregnancy sign due to hormonal changes increasing blood flow to the kidneys",
            "Mood swings - Emotional fluctuations around 6 to 10 weeks, attributed to stress, fatigue, and hormonal shifts",
            "Excessive saliva - Increased saliva production or decreased swallowing, managed by oral hygiene and dietary adjustments.",
            "Constipation - Affects up to half of pregnant women, mitigated by high-fiber diet, hydration, exercise, and appropriate prenatal vitamins",
            "Heartburn - Common discomfort, manageable through dietary adjustments, smaller meals, and proper posture."
        ],
        pregnancyChecklist: [
            "Eat Well - Strive for a nutritious diet; if nausea hinders this in the first trimester, do your best and consider the 12 best foods for pregnancy",
            "Connect with Your Partner -  Enhance bonding before the baby arrives through date nights and shared discussions on parenting and future aspirations",
            "Predict Your Baby's Sex -  For fun, try unscientific gender predictor tests, understanding they have a 50/50 accuracy",
            "Decide When to Announce Pregnancy - Choose the timing based on personal and professional considerations, and plan a creative announcement."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-7-tailbone_square.png',
            'https://assets.babycenter.com/ims/2023/01/7-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 8,
        babyDevelopment: "Your baby's first movements begin as spontaneous twitches and stretches around 7 to 8 weeks, visible on ultrasound, but won't be felt by you until between 16 and 22 weeks. Meanwhile, your baby's respiratory system and a network of nerves are developing, with breathing tubes extending to the lungs and nerves connecting to various muscles, tissues, and organs like the eyes and ears. The baby is the size of a kidney bean.",
        pregnancySymptoms: [
            "White discharge - Increased white creamy discharge in early pregnancy is normal, attributed to higher estrogen levels, but green, smelly, or itchy discharge may indicate an infection.",
            "Swollen Breasts - Pregnancy hormones cause breasts to grow, potentially increasing cup size, and can lead to visible veins, darker nipples, and more pronounced bumps on areolas.",
            "Bloating - Hormonal changes in early pregnancy can cause abdominal bloating, making clothes feel snug at the waistline.",
            "A heightened sense of smell - food aversions are common in early pregnancy due to surging hormones, usually improving by the second trimester.",
            "Pregnancy dreams - can be vivid and strange, reflecting the excitement, fears, and worries about becoming a parent.",
            "Headaches - during pregnancy headaches are common, with safe relief options including acetaminophen (under guidance), massages, compresses, relaxation techniques, and showers.",
            "Severe morning sickness - hyperemesis gravidarum, affects a small percentage of pregnant women, leading to dehydration and weight loss; immediate medical consultation is advised for severe symptoms."
        ],
        pregnancyChecklist: [
            "Start documenting your bump - Document your growing pregnancy bump weekly for a fun time-lapse comparison, starting even before the bump is noticeable.",
            "Pay attention to mental health - Monitor and address your mental health during pregnancy, especially if experiencing prolonged or severe mood changes.",
            "Get good pregnancy sleep - Enhance pregnancy sleep by practicing good sleep hygiene, using the right pillows, and adjusting your diet and bedtime routine for better rest.",
            "Use sunscreen - Apply sunscreen to prevent melasma, a condition causing darker patches on the skin due to pregnancy-related hormonal changes.",
            "Learn about pregnancy weight gain - Understand and manage pregnancy weight gain by considering your pre-pregnancy BMI and using resources like a pregnancy weight gain calculator."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-8-brain-nerve-cells_square.png',
            'https://assets.babycenter.com/ims/2023/01/8-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 9,
        babyDevelopment: "Ten tiny tooth buds are forming in your baby's gums, which will become the 20 baby teeth that appear between 4 and 7 months, although it's rare, some babies are born with a tooth. The four chambers of your baby's heart have formed, producing a heartbeat that many describe as the thunder of galloping horses, and the placenta, a new organ attached to the uterus and connected through the umbilical cord, is now developed enough to support the baby's growth, becoming about 9 inches in diameter by the end of pregnancy. The baby is the size of a grape.",
        pregnancySymptoms: [
            "Food Cravings - Hormonal changes during pregnancy impact taste and smell, leading to cravings that may or may not be linked to nutritional needs; indulge in moderation but report any nonfood cravings to your healthcare provider",
            "Food Aversions - Rapid increases in estrogen can make previously enjoyed foods repulsive, commonly affecting meat, eggs, dairy, spicy foods, strong-smelling foods, and coffee.",
            "Heightened Sense of Smell - Many pregnant women experience an increased sensitivity to smells, which can contribute to nausea; consider alternative meal arrangements if affected",
            "Nausea and Vomiting - Often peaking in the first trimester, morning sickness is thought to protect the fetus from toxins, with remedies available to alleviate symptoms.",
            "Heartburn - Hormonal and physical changes can cause heartburn, characterized by a burning sensation in the throat and chest; avoid certain foods and drinks to manage symptoms.",
            "Constipation - Affecting up to half of pregnant women, constipation can be relieved through a high-fiber diet, plenty of water, and pregnancy-safe exercises"
        ],
        pregnancyChecklist: [
            "Start a daily bonding ritual - Dedicate time each day to connect with your baby, either through quiet reflection, journaling, or writing letters, focusing on the journey ahead and the type of parent you aspire to be.",
            "Involve your partner - Share the pregnancy experience with your partner by involving them in activities like talking to the baby, reading pregnancy books together, and making decisions about the baby's future",
            "Incorporate walking into your routine - Walking is a safe and recommended form of exercise during pregnancy, suitable for continuation or gradual introduction, with precautions like using SPF, staying hydrated, and adjusting intensity as advised by a healthcare provider",
            "Ensure vaccination - Getting vaccinated against the flu and COVID-19 during pregnancy is safe and protects both the mother and the baby, with antibodies passed on to the baby providing early protection",
            "Be cautious with household chemicals - Evaluate and limit exposure to potentially harmful household substances, including certain cleaning products, pesticides, and lead in drinking water, to protect your pregnancy."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-9-finger-touch-pads_square.png',
            'https://assets.babycenter.com/ims/2023/01/9-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 10,
        babyDevelopment: "Your baby's eyes have fully formed with the cornea, iris, pupil, lens, and retina, but the eyelids will remain shut until around 27 weeks of pregnancy. Baby's teeth are beginning to harden and connect to the jaw bone, with the first tooth typically appearing between 6 to 10 months, while early brain development is marked by a temporarily bulging forehead and the formation of synapses in the spinal cord allowing limb movement. The baby is the size of a kumquat.",
        pregnancySymptoms: [
            "Body changes - Slight weight gain and bloating may thicken your midsection, requiring stretchy waistbands and maternity fashion hacks for comfort",
            "Increased salivation - especially during nausea, is common in pregnancy; managing it can include drinking more water, chewing gum, or sucking on hard candy.",
            "Vaginal discharge - An increase in odorless or mild-smelling milky white vaginal discharge due to higher estrogen is normal; consult a healthcare provider for any sudden changes",
            "Newly visible veins - Prominent blue veins across the chest, breasts, and belly, as well as possible varicose veins, are due to increased blood volume, often improving post-birth.",
            "Mood swings - Mood swings during pregnancy are normal, influenced by stress, fatigue, and hormonal changes; persistent negative feelings may indicate depression, necessitating professional help.",
            "Morning sickness - Morning sickness peaks around 9 or 10 weeks due to high hCG and estrogen levels but often improves early in the second trimester as hCG levels drop.",
            "Dizziness - lightheadedness can occur due to increased blood volume; immediate sitting or lying down is advised for relief."
        ],
        pregnancyChecklist: [
            "Review your finances - to accommodate new expenses and possibly reduced income with a new baby, including revising insurance, wills, and understanding tax implications.",
            "Try prenatal yoga - for safe exercise tailored for expecting moms, offering benefits like stretching, breath awareness, and preparation for labor and birth.",
            "Manage morning sickness - by eating small, frequent meals, preferring cold foods, and considering safe medications as advised by your healthcare provider.",
            "Be vigilant about UTIs during pregnancy - reporting any symptoms like pain during urination or cloudy urine to your healthcare provider for treatment.",
            "Decide on the timing for your pregnancy announcement - considering personal comfort and workplace dynamics, with no specific requirement on when to inform your employer but doing so in a timely manner can facilitate maternity leave planning."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-10-fingernails_square.png',
            'https://assets.babycenter.com/ims/2023/01/10-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 11,
        babyDevelopment: "By the end of the first trimester, your baby's fingers and toes have become distinct and longer, all vital organs are in place with many starting to function, including the heart with its four chambers beating. Additionally, the baby's genitals begin to develop, with the external sex organs starting to differentiate around 11 weeks, although it takes several more weeks for the differences to be easily identifiable on an ultrasound. The baby is the size of a fig.",
        pregnancySymptoms: [
            "Constipation and Gas - Hormonal changes during pregnancy can slow digestion, causing constipation, gas, and bloating; staying hydrated, eating high-fiber foods, and exercising can help alleviate these issues.",
            "Heartburn - Many women experience heartburn for the first time during pregnancy due to hormonal changes, which can be mitigated by eating smaller meals, avoiding fatty and spicy foods, and not lying down after eating.",
            "Conflicting Emotions - The profound life changes that come with having a baby can provoke a mix of excitement and anxiety; prioritizing self-care is essential for both maternal and baby's health.",
            "Fatigue -  Pregnancy fatigue is common but may improve in the second trimester; maintaining energy levels through nutritious snacks, adequate sleep, and reducing unnecessary tasks is recommended.",
            "Vaginal Discharge - Increased estrogen can lead to more vaginal discharge, which should be clear to milky-white and mild-smelling; consult a healthcare provider if the discharge is off-color, smelly, or accompanied by discomfort.",
            "Food Aversions: Experiencing food aversions is normal during pregnancy, affecting about 60% of pregnant women, often improving in the second trimester.",
            "Headaches-  Headaches may occur due to hormonal changes, stress, and other factors, with some safe relief options including exercise, avoiding triggers, and approved medications."
        ],
        pregnancyChecklist: [
            "Learn about Pregnancy Weight Gain - Aim for a 1 to 5-pound gain in the first trimester if starting at a healthy weight; use a weight gain calculator and consult your doctor for concerns.",
            "Build Your Support Network - Connect with other moms and expecting moms for advice and shared experiences, including online in BabyCenter Birth Clubs and in-person through prenatal classes.",
            "Plan a Babymoon - Consider a vacation during pregnancy, ideally in the second trimester for more energy, and research destinations, safety tips, and packing essentials.",
            "Save Time at the Doctor's Office - Schedule prenatal appointments early in the morning or right after lunch to minimize waiting time due to fewer patient backlogs.",
            "Eat Calcium-Rich Foods - Ensure a daily intake of 1000 mg of calcium to support baby's development and prevent bone depletion, through diet and possibly supplements.",
            "Take Care of Your Skin - Address pregnancy-related skin issues with plenty of water, sunscreen, and frequent moisturizing, noting that some conditions are unavoidable."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-11-tooth-buds_square.png',
            'https://assets.babycenter.com/ims/2023/01/11-weeks-baby-in-body-jan-2023_square.png']
    },
    {
        week: 12,
        babyDevelopment: "This week, your baby has developed the ability to open and close their hands and curl their toes, and has begun growing tiny fingernails on their fingers and toes. The baby's digestive system is also developing, with the intestines initially growing into the umbilical cord but soon to retract into the abdomen as the abdominal wall closes. The baby is the size of a lime.",
        pregnancySymptoms: [
            "Pregnancy Stress - Feeling some stress during pregnancy is normal, but chronic stress can lead to depression or anxiety, so it's important to discuss overwhelming stress with a healthcare provider.",
            "Headaches - Common around 12 weeks, headaches may be mitigated by frequent small meals, hydration, sleep, exercise, relaxation techniques, and prenatal massage. Acetaminophen is considered safe, but always consult a healthcare provider before taking any medication during pregnancy.",
            "Food Aversions - Often caused by hormonal changes and a heightened sense of smell, affecting around 60% of pregnant women. Strategies include eating bland or cold foods and having someone else cook to avoid triggering smells.",
            "Fatigue - Experienced by 95% of pregnant women, especially in the first and third trimesters. Gentle exercise can help maintain energy levels, but persistent fatigue should be discussed with a healthcare provider as it may indicate iron-deficiency anemia or depression.",
            "Dizziness -Caused by cardiovascular changes during pregnancy. To combat dizziness, lie on your side or sit with your head between your knees to improve blood flow.",
            "Shortness of Breath - A common symptom due to increased oxygen needs and lung capacity expansion. Normal to an extent, but severe symptoms, especially with existing respiratory issues, require immediate medical attention."
        ],
        pregnancyChecklist: [
            "Make a Baby Budget - Discuss with your partner how to manage expenses such as clothes, diapers, and childcare, and identify areas to cut spending for savings.",
            "Start a Pregnancy Workout - Engage in 20-30 minutes of moderate exercise most days, as recommended, to prepare your body for pregnancy and childbirth.",
            "Stay Hydrated -  Aim for about ten 8-ounce cups of water daily to prevent pregnancy-related health issues, adjusting intake based on activity and weather.",
            "Keep a Journal - Document your pregnancy experience to enhance emotional well-being and create a cherished keepsake.",
            "Do Your Kegels - Regular pelvic floor exercises can ease post-birth recovery, prevent incontinence, and improve sexual enjoyment.",
            "Get Vaccinated - The flu shot and COVID-19 vaccine are recommended to protect against severe infection and pass antibodies to your baby."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-12-eyelids_square.png',
            'https://assets.babycenter.com/ims/2020/12/12-weeks-pregnant-recolored-app.png']
    },
    {
        week: 13,
        babyDevelopment: "Your baby has begun the process of swallowing amniotic fluid and excreting urine, cycling through the fluid volume every few hours, and is producing meconium, a black, sticky substance that will be their first bowel movement. Meanwhile, the bones in your baby's skeleton, including the longer bones and the skull, are starting to harden, and their teeth and bones are becoming denser. The baby is the size of a peapod.",
        pregnancySymptoms: [
            "Cramping - Occasional cramping is common in pregnancy, often due to gas, bloating, or round ligament pain. Easing methods include movement, baths, hydration, or rest, but severe or persistent cramps, especially with other symptoms, warrant medical attention.",
            "Returning Appetite -The second trimester may bring relief from morning sickness and food aversions, along with a return of appetite and possible food cravings, which might be linked to nutritional needs or other factors.",
            "Stuffy Nose - A stuffy nose is common in pregnancy due to hormonal changes and increased blood volume. If accompanied by fever or other infection symptoms, consult a healthcare provider and consider safe cold remedies and vitamin C.",
            "Visible Veins - Increased blood volume during pregnancy makes veins more visible and may lead to varicose veins, especially in the legs and lower body, which typically improve post-birth.",
            "Vaginal Discharge - Increased discharge is normal, caused by higher estrogen levels. However, if the discharge is off-color, painful, or itchy, it could indicate an infection, requiring a healthcare provider's assessment.",
            "Heartburn - Pregnancy can cause heartburn due to hormonal and physical changes. Managing heartburn involves dietary adjustments, eating habits, and possibly safe heartburn medications recommended by a healthcare provider."
        ],
        pregnancyChecklist: [
            "Increase Prenatal Visits - During the second trimester, expect to see your healthcare provider every four weeks to monitor the pregnancy's progress and discuss any concerns.",
            "Prioritize Nutrition - Emphasize incorporating healthy foods into your diet to support pregnancy, focusing on protein, healthy fats, and essential vitamins and minerals like folic acid, iron, and calcium.",
            "Be Informed About Complications - Understand the signs of common pregnancy complications such as gestational diabetes and preeclampsia, and communicate any concerns with your healthcare provider.",
            "Adopt Side-Sleeping - Sleeping on your side is recommended to optimize blood flow to the uterus and minimize discomfort, improving both maternal and fetal well-being.",
            "Maintain a Healthy Sex Life: If comfortable, continue sexual activity during pregnancy, which is safe and may even be more enjoyable due to increased blood flow.",
            "Save on Maternity Clothes - Explore affordable options for maternity wear, such as buying secondhand, swapping clothes, or finding deals online to save money."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-13-fingerprints_square.png',
            'https://assets.babycenter.com/ims/2020/12/13-weeks-pregnant-recolored-app.png']
    },
    {
        week: 14,
        babyDevelopment: "The baby has started to make faces and is making sucking and chewing movements. Hair follicles have started to form deep on the skin. The baby has started to become active and make movements despite the mother not feeling any kicks or punches yet. The baby is the size of a lemon and measures about 5.79 inches and 3.28 ounces in weight.",
        pregnancySymptoms: [
            "Reduced morning sickness",
            "Starting to show",
            "Bleeding gums - Pregnancy gingivitis can be caused by hormonal changes that make your gums more sensitive to bacteria in plaque",
            "Round ligament pain - The two ligaments located on the sides of the uterus stretch and thicken to accommodate the growing stomach",
            "Increased appetite"
        ],
        pregnancyChecklist: [
            "Get your teeth cleaned - Pregnant women are susceptible to gum inflammation",
            "Find a prenatal exercise class - Pregnancy exercise can boost your mood, help you get better sleep, lower risk of complications, and reduce stress"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-14-face-muscles_square.png',
            'https://assets.babycenter.com/ims/2020/12/14-weeks-pregnant-recolored-app.png']
    },
    {
        week: 15,
        babyDevelopment: "The baby has started forming taste buds and nerves began connecting them to the brain. The baby’s legs are growing and they can now move all their joints and limbs. The baby is very active at this point but you may not feel it. The baby has developed eyelids, eyebrows, eyelashes, nails, hair, fingers, and toes. The baby is about the size of an apple measures about 6.57 inches head to toe and weighs 4.13 ounces.",
        pregnancySymptoms: [
            "Nasal Congestion - The combined effect of hormonal changes and increased blood flow to your mucous membranes can cause nasal congestion",
            "Nosebleeds - About 20% of pregnant women have nosebleeds due to increased blood volume and blood vessel expansion in the nose",
            "Heartburn - Heartburn can be caused by physical and hormonal changes",
            "Swollen gums - About half of pregnant women have swollen, red gums due to pregnancy gingivitis. Brush gently twice a day and floss daily. Make sure to visit the dentist for a checkup and cleaning",
            "Pregnancy weight gain - If you started pregnancy at a healthy weight, you should be gaining a pound a week for the rest of your pregnancy"
        ],
        pregnancyChecklist: [
            "Start a pregnancy exercise routine - Many women find that prenatal exercise classes are a great way to bond with and get support from other moms."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-15-lung-development_square.png',
            'https://assets.babycenter.com/ims/2020/12/15-weeks-pregnant-recolored-app.png']
    },
    {
        week: 16,
        babyDevelopment: "At 16 weeks of pregnancy, the baby's skin is thin and almost transparent, with hair follicles forming a pattern on the scalp. The baby's heart is pumping about 25 quarts of blood daily. At this stage, the baby is approximately the size of an avocado, measuring 7.32 inches from head to toe and weighing 5.15 ounces.",
        pregnancySymptoms: [
            "Round ligament pain",
            "Gas and bloating",
            "Back pain",
            "Breast changes",
            "Forgetfulness",
            "Headaches"
        ],
        pregnancyChecklist: [
            "Investigate second-trimester prenatal tests like Alpha Fetal Protein (AFP) for neural tube defect screening",
            "Avoid unsafe activities",
            "Track weight gain",
            "Start a baby names list",
            "Connect with the baby by talking to them, narrating activities, or writing a letter"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-16-heart-development_square.png',
            'https://assets.babycenter.com/ims/2020/12/16-weeks-pregnant-recolored-app.png']
    },
    {
        week: 17,
        babyDevelopment: "At 17 weeks of pregnancy, the baby's skeleton is transitioning from soft cartilage to bone, and the umbilical cord is growing stronger and thicker, reaching approximately 9 inches in length. The baby is about the size of a turnip, measuring 8.03 inches and weighing 6.38 ounces.",
        pregnancySymptoms: [
            "Dizziness",
            "Vision changes",
            "Itchy skin",
            "Stretch marks",
            "Vivid dreams",
            "Constipation"
        ],
        pregnancyChecklist: [
            "Practice relaxation techniques",
            "Ensure proper seat belt use",
            "Seek meal planning help",
            "Wear sunscreen to prevent skin pigmentation changes"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-17-skeleton_square.png',
            'https://assets.babycenter.com/ims/2020/12/17-weeks-pregnant-recolored-app.png']
    },
    {
        week: 18,
        babyDevelopment: "At 18 weeks of pregnancy, the baby's facial features, including ears, nose, lips, eyelids, eyebrows, eyelashes, nails, and hair, are recognizable on an ultrasound. Additionally, the baby's lungs are developing, with bronchioles forming and respiratory sacs starting to appear. Gender-specific organs are visible, and if it's a girl, her uterus and fallopian tubes are formed. The baby is approximately the size of a bell pepper, measuring 8.74 inches from head to toe and weighing 7.87 ounces.",
        pregnancySymptoms: [
            "Increased appetite",
            "Dizziness",
            "Swelling in the feet and ankles",
            "Vaginal discharge",
            "Leg cramps"
        ],
        pregnancyChecklist: [
            "Think about maternity leave",
            "Prepare older children for the new sibling",
            "Sign up for childbirth classes",
            "Cope with stress",
            "Incorporate iron-rich foods into the diet due to increased iron needs during pregnancy"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-18-ears_square.png',
            'https://assets.babycenter.com/ims/2020/12/18-weeks-pregnant-recolored-app.png']
    },
    {
        week: 19,
        babyDevelopment: "At 19 weeks of pregnancy, the baby's development includes the formation of distinct fingerprints on fingers and toes. Sensory development is rapidly progressing, with specialized areas for smell, taste, hearing, vision, and touch. Additionally, a white, waxy coating called vernix caseosa is forming on the baby's skin, providing protection, and moisture, and aiding in the development of the lungs and digestive tract. The baby is approximately the size of an heirloom tomato, measuring 9.45 inches and weighing 9.63 ounces.",
        pregnancySymptoms: [
            "Round ligament pain",
            "Abdominal pain",
            "Skin changes",
            "Nosebleeds",
            "Shortness of breath"
        ],
        pregnancyChecklist: [
            "Embrace the pregnancy body type with comfortable and flattering maternity clothes",
            "Consider childcare options",
            "Plan something enjoyable for baby-free time",
            "Improve sleep",
            "Connect with other parents through groups or classes"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-19-hair_square.png',
            'https://assets.babycenter.com/ims/2020/12/19-weeks-pregnant-recolored-app.png']
    },
    {
        week: 20,
        babyDevelopment: "At 20 weeks of pregnancy, the baby's development includes the ability to experience hiccups in the womb, taste buds transmitting taste signals to the brain, and the formation of distinct fingerprints. The baby is approximately the size of a banana, measuring 10.12 inches and weighing 11.68 ounces.",
        pregnancySymptoms: [
            "Itchy skin",
            "Restless sleep",
            "Hair and nail changes",
            "Lower back pain",
            "Constipation"
        ],
        pregnancyChecklist: [
            "Look for a pediatrician",
            "Treat oneself to celebrate the halfway point of pregnancy",
            "Experiment in bed with pregnancy-safe sex positions",
            "Do a 'brain dump' by writing down worries in a journal for stress relief"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-20-fetal-movement_square.png',
            'https://assets.babycenter.com/ims/2020/12/20-weeks-pregnant-recolored-app.png']
    },
    {
        week: 21,
        babyDevelopment: "At 21 weeks of pregnancy, the baby's development includes the presence of taste buds and the ability to suck their thumb. The baby's skin is wrinkled and translucent, appearing red due to visible blood vessels. The baby is approximately the size of a carrot, measuring 10.79 inches and weighing 14.07 ounces.",
        pregnancySymptoms: [
            "Varicose veins",
            "Bleeding gums",
            "Clumsiness",
            "Braxton Hicks contractions",
            "Heartburn",
            "Weight gain"
        ],
        pregnancyChecklist: [
            "Check for signs of pregnancy-related swelling in fingers",
            "Avoid unsafe activities",
            "Review finances to accommodate the upcoming changes",
            "Create a baby registry",
            "Manage stress through various techniques"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-21-eyelid_square.png',
            'https://assets.babycenter.com/ims/2020/12/21-weeks-pregnant-recolored-app.png']
    },
    {
        week: 22,
        babyDevelopment: "At 22 weeks of pregnancy, the baby's development includes the presence of visible hair on the head, eyebrows, and lanugo (soft, fine body hair) on the back, ears, shoulders, and forehead. The baby may be able to hear sounds from inside the mother's body, such as breathing, heartbeat, and digestion. The baby is approximately the size of a spaghetti squash, measuring 11.42 inches and weighing 1.05 pounds.",
        pregnancySymptoms: [
            "Acne",
            "Spider veins",
            "Diarrhea",
            "Swelling",
            "Leg cramps",
            "Pelvic pain"
        ],
        pregnancyChecklist: [
            "Think about the baby shower",
            "Ensure an adequate intake of iron to prevent anemia",
            "Sign up for birth classes to prepare for labor and delivery",
            "Be aware of carpal tunnel syndrome, which pregnant women may be more prone to due to hand and wrist swelling"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-22-eyes_square.png',
            'https://assets.babycenter.com/ims/2020/12/22-weeks-pregnant-recolored-app.png']
    },
    {
        week: 23,
        babyDevelopment: "At 23 weeks of pregnancy, the baby's development includes the ability to hear external sounds, such as the mother's voice, and the beginning of wave-like movements in the digestive system, though no actual food is present. Baby movements may transition from subtle flutters to stronger kicks and jabs, allowing for the observation of patterns. The baby is approximately the size of a large mango, measuring 12.05 inches and weighing 1.25 pounds.",
        pregnancySymptoms: [
            "Appearance of the linea nigra (dark line on the belly)",
            "Breast changes",
            "Pregnancy cravings",
            "Vision changes",
            "Forgetfulness"
        ],
        pregnancyChecklist: [
            "Decide whether to hire a doula for labor support",
            "Write a letter or create a keepsake for the baby",
            "Sleep on the side for better rest",
            "Start exercises to prepare the body for labor"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-23-hearing_square.png',
            'https://assets.babycenter.com/ims/2020/12/23-weeks-pregnant-recolored-app.png']
    },
    {
        week: 24,
        babyDevelopment: "At 24 weeks, the baby's development includes the growth and multiplication of respiratory sacs in the lungs, enhancing the exchange of oxygen and carbon dioxide. Although the baby is still relatively lean, the body is proportionally filling out, and the skin remains thin. Facial expressions, such as eyebrow-raising, are practiced by the baby. The baby is approximately the size of an ear of corn, measuring 12.68 inches and weighing 1.48 pounds.",
        pregnancySymptoms: [
            "Rashes",
            "Spotting",
            "Mood swings",
            "Shortness of breath",
            "Increased appetite",
            "Melasma"
        ],
        pregnancyChecklist: [
            "Know the signs of preterm labor",
            "Seek medical attention for symptoms like unusual discharge, bleeding, cramping, pelvic pressure, low back pain, or leaking fluid",
            "Consider safety measures and babyproofing for the home",
            "Think about cord blood banking",
            "Prepare for the glucose screening, a routine test for gestational diabetes typically scheduled between 24 and 28 weeks"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-24-lung-development_square.png',
            'https://assets.babycenter.com/ims/2020/12/24-weeks-pregnant-recolored-app.png']
    },
    {
        week: 25,
        babyDevelopment: "At 25 weeks, the baby is undergoing significant developments, such as the accumulation of baby fat, leading to a smoother appearance and a resemblance to a newborn. The baby is also growing more hair, with its color and texture becoming discernible. Sleeping patterns are established, with the baby spending most of its time in cycles of rapid eye movement (REM) and non-REM sleep. The baby's size is approximately that of a rutabaga, measuring 13.27 inches and weighing 1.73 pounds.",
        pregnancySymptoms: [
            "Thicker hair due to hormonal changes",
            "Pelvic girdle pain or symphysis dysfunction (SPD)",
            "Itching caused by skin stretching",
            "Insomnia",
            "Dizziness",
            "Gas and bloating"
        ],
        pregnancyChecklist: [
            "Recognize signs of potential pregnancy problems",
            "Seek medical attention if needed",
            "Think about the baby's sleeping space",
            "Plan for financial considerations and maternity leave options",
            "Get vaccinated against recommended diseases like flu, Tdap, and COVID-19"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-25-baby-fat_square.png',
            'https://assets.babycenter.com/ims/2020/12/25-weeks-pregnant-recolored-app.png']
    },
    {
        week: 26,
        babyDevelopment: "At 26 weeks, the baby's lung development is progressing as it inhales and exhales small amounts of amniotic fluid. Additionally, the baby can now respond to sounds, including the mother's voice, and may exhibit changes in heartbeat, breathing, and movement when exposed to loud noises. For male babies, the testicles have started to descend into the scrotum. The baby's size is comparable to a scallion, measuring 13.82 inches and weighing 2.01 pounds.",
        pregnancySymptoms: [
            "Lower-back pain",
            "Braxton Hicks contractions",
            "Headaches",
            "Constipation",
            "Appearance of stretch marks due to the rapid stretching of the skin"
        ],
        pregnancyChecklist: [
            "Plan a babymoon",
            "Consider additional classes on baby care, breastfeeding, and infant CPR",
            "Be prepared for potential worst-case scenarios, such as emergencies",
            "Manage blood sugar through diet and exercise if diagnosed with gestational diabetes",
            "Cope with gender disappointment and seek support if needed"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-26-ear-nerves_square.png',
            'https://assets.babycenter.com/ims/2020/12/26-weeks-pregnant-recolored-app.png']
    },
    {
        week: 27,
        babyDevelopment: "At 27 weeks, the baby's eyes can now open and close, responding to light with movements. Fetal hiccups are common, lasting only a few moments and are considered normal. The baby's lungs are producing surfactant, essential for keeping air sacs open after birth. The baby's size is approximately that of a head of cauliflower, measuring 14.41 inches and weighing 2.33 pounds.",
        pregnancySymptoms: [
            "Extra body hair growth",
            "Restless legs",
            "Urinary incontinence",
            "Swelling (edema)",
            "Weight gain",
            "Pelvic pain due to hormonal shifts, weight gain, and changes in the center of gravity"
        ],
        pregnancyChecklist: [
            "Prepare for more frequent prenatal visits",
            "Conduct third-trimester shopping for essentials like nursing bras and comfortable postpartum clothing",
            "Start Kegel exercises to strengthen pelvic floor muscles and prevent issues like urine leaks and hemorrhoids",
            "Manage pelvic pain with regular exercise, breaks for rest, and supportive devices like pregnancy girdles or belly bands",
            "Consistently monitor weight gain and seek professional advice if needed"
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-27-sleep_square.png',
            'https://assets.babycenter.com/ims/2020/12/27-weeks-pregnant-recolored-app.png']
    },
    {
        week: 28,
        babyDevelopment: "During this trimester, your baby's brain will significantly grow, tripling in weight and developing deep grooves in the cerebrum to increase surface area without requiring more space. Additionally, your baby's senses of hearing, smell, and touch are now functional, and by 28 weeks, the autonomic nervous system begins to regulate body temperature and rhythmic breathing movements, aiding in lung development. The baby is the size of a large eggplant.",
        pregnancySymptoms: [
            "Leg Cramps During Pregnancy - Common in the third trimester, caused by extra weight, potential vitamin deficiencies, and less exercise. Temporary and can be eased by changing positions or gentle movement.",
            "Hemorrhoids - Swollen blood vessels causing light bleeding, common due to constipation, pressure from the growing uterus, and hormonal changes. Preventable by staying hydrated, active, and eating high-fiber foods.",
            "Weird Dreams - Increased due to hormonal changes and interrupted sleep, reflecting anxieties about pregnancy and parenting. More vivid and possibly involves increased sex dreams due to higher blood flow.",
            "Pregnancy Rashes - This can be caused by pre-existing conditions or specific pregnancy-related conditions like atopic eruption of pregnancy and PUPPP. Treatment varies from topical ointments to oral medications.",
            "Leaking Breasts - Possible in the third trimester, indicating colostrum production. Colostrum is nutrient-rich, preparing the body for breastfeeding. Use nursing pads if leakage is bothersome."
        ],
        pregnancyChecklist: [
            "Track Baby Movements - Notice patterns of your baby's movements in the third trimester and alert healthcare providers to any changes, as it could indicate a problem.",
            "Find a Pediatrician - Start looking for a pediatrician who meets your insurance, location, and schedule needs, as the baby will need a check-up shortly after birth.",
            "Create a Birth Plan - While optional, a birth plan can help you outline your preferences for labor and delivery, which you should discuss with your healthcare provider.",
            "Budget for Baby Costs - Research and budget for major first-year expenses like diapers, formula, and daycare using tools like a Baby Costs Calculator.",
            "Prepare and proactive planning - Preparation and proactive planning are key to ensuring the health and well-being of both mother and baby during pregnancy and beyond."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-28-eyelashes_square.png',
            'https://assets.babycenter.com/ims/2020/12/28-weeks-pregnant-recolored-app.png']
    },
    {
        week: 29,
        babyDevelopment: "Your baby's bones are strengthening through calcium absorption, requiring about 250 milligrams daily, while a protective myelin sheath forms around their nerves. Additionally, their respiratory system is developing, with surfactant production by 35 weeks ensuring they can breathe air at birth. The baby is the size of a butternut squash.",
        pregnancySymptoms: [
            "Anemia - Iron is crucial during pregnancy for the baby, placenta, and production of hemoglobin. Low iron levels can lead to anemia, causing fatigue and weakness, and may require supplements or infusions.",
            "Cramping - Common in the third trimester, cramping can result from round ligament pain, Braxton Hicks, or constipation, but severe cramping could indicate serious issues like preterm labor.",
            "Heartburn - Caused by the relaxation of gastrointestinal muscles due to pregnancy hormones and a growing uterus. Management includes smaller meals, staying hydrated, and using pillows for elevation.",
            "Lightheadedness - Changes in the cardiovascular system can cause lightheadedness or dizziness, mitigated by regular eating, drinking, and cautious movement."
        ],
        pregnancyChecklist: [
            "Third-Trimester Prenatal Visits: Increased frequency of visits to the doctor or midwife, moving to twice a month and then weekly from 36 weeks; opportunity to discuss labor, delivery, and any mood changes, like increased anxiety or depression.",
            "Assembling Baby Gear: - Unpack and assemble baby gear like cribs, bassinets, changing tables, and strollers with help from a friend or partner.",
            "Hospital or Birth Center Tour - Take a tour to familiarize yourself with the birth location and complete preregistration for a smoother admission process.",
            "Gathering Your Support Team - Begin organizing support from friends and family for post-birth, potentially arranging a meal train and assistance with newborn care."
        ], images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-29-brain-development_square.png',
            'https://assets.babycenter.com/ims/2020/12/29-weeks-pregnant-recolored-app.png']
    },
    {
        week: 30,
        babyDevelopment: "Your baby is developing melanin, determining skin color, with their permanent skin tone settling around 6 months post-birth, and they may now have more head hair as body hair (lanugo) sheds before birth. Their eyes can open and perceive dim shapes, with pupils adjusting to light by 31 weeks. The baby is the size of a large cabbage.",
        pregnancySymptoms: [
            "Belly Button Changes - The expanding uterus may turn an 'innie' belly button into an 'outie,' causing sensitivity or discomfort and in rare cases, can lead to an incarcerated umbilical hernia needing emergency care.",
            "Brown Discharge - Increased estrogen causes more vaginal discharge, with brown discharge being old blood, usually harmless unless accompanied by symptoms indicating serious conditions like placenta previa or infection.",
            "Fatigue - The third trimester may bring renewed fatigue, necessitating rest and a healthy diet, and could indicate iron-deficiency anemia or depression.",
            "Swelling - Expected swelling in ankles and feet due to increased uterus size and fluid retention, with severe or sudden swelling needing immediate medical attention as it may signal preeclampsia or DVT.",
            "Mood Swings - Hormonal changes and stress can lead to mood swings, with severe or prolonged changes possibly indicating depression or anxiety, requiring professional treatment.",
            "Shortness of Breath - Increased oxygen needs and pressure on the diaphragm from the growing uterus cause shortness of breath, which may ease when the baby drops before labor, but severe symptoms should prompt immediate medical consultation."
        ],
        pregnancyChecklist: [
            "Prenatal Massage: Book a session with a licensed therapist for relief from discomfort and to boost your mood.",
            "Research Doulas: Consider hiring a doula for labor, delivery, or postpartum support.",
            "Cord Blood Banking: Decide whether to privately bank your baby's cord blood or donate it to a public bank.",
            "Get Vaccinated: Stay up-to-date on vaccinations recommended during pregnancy. Consult your healthcare provider for personalized advice and guidance."
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-30-amniotic-fluid_square.png',
            'https://assets.babycenter.com/ims/2020/12/30-weeks-pregnant-recolored-app.png']
    },
    {
        week: 31,
        babyDevelopment: "At 31 weeks, your baby is developing rapidly, plumping up with accumulating fat underneath the skin. Their movements are becoming more pronounced, with stretches, kicks, and somersaults, indicating their health and activity. Brain development is in full swing, with the cerebrum forming deep grooves, and tripling in weight during the last trimester. Your baby, now the size of a coconut, measures approximately 16.46 inches and weighs around 3.86 pounds.",
        pregnancySymptoms: [
            "Pregnancy symptoms may include Braxton Hicks contractions, leaky breasts producing colostrum, frequent urination due to hormonal changes and pressure on the bladder, lower back pain from a shifting center of gravity, and trouble sleeping.",
            "Additionally, issues like sciatica, marked by pain radiating from the lower back down the buttocks and legs, may arise. These symptoms are common in pregnancy, and relief strategies include warm compresses, gentle stretches, Kegel exercises, and prenatal interventions like acupuncture or massage.",
            "Your body may also experience heightened anxiety, increased urinary frequency, and difficulty sleeping. It's essential to stay hydrated and reach out to your healthcare provider if you have concerns."
        ],
        pregnancyChecklist: [
            "Stretches for labor preparation",
            "Involving your other children in anticipating the new baby",
            "Considering pain management options for labor",
            "Addressing mental health concerns",
            "Babyproofing"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-31-taste-buds_square.png',
            'https://assets.babycenter.com/ims/2020/12/31-weeks-pregnant-recolored-app.png']
    },
    {
        week: 32,
        babyDevelopment: "At 32 weeks, your baby is actively storing essential minerals like iron, calcium, and phosphorus, with iron stores lasting into the first six months after birth. The baby's lungs are still practicing breathing by inhaling and exhaling amniotic fluid. In terms of genital development, if it's a boy, his external genitalia are formed, and testicles are descending to the scrotum. For a girl, the uterus and ovaries are in place with all the eggs she'll have. The baby, approximately the size of a jicama, measures 16.93 inches and weighs around 4.30 pounds.",
        pregnancySymptoms: [
            "\"Lightning crotch,\" characterized by sharp pelvic pains due to pressure from the growing baby",
            "Swollen hands and face (indicating preeclampsia if severe)",
            "Itching skin from skin stretching",
            "Stretch marks on the belly and breasts",
            "Varicose veins due to increased pressure on veins",
            "Changes in appetite with potential difficulty eating larger meals"
        ],
        pregnancyChecklist: [
            "Get vaccinated: Ensure Tdap, RSV, flu, and COVID shots are up to date to protect both you and your baby.",
            "Prepare for breastfeeding: Learn about it, consider classes and support groups, and arrange for a breast pump.",
            "Choose baby names: Use tools to explore options and discuss with your partner.",
            "Decide on delivery room guests: Consider who you want present and set visitor expectations.",
            "Stock up on supplies: Gather household essentials and baby care items for the postpartum period."
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-32-fingernails_square.png',
            'https://assets.babycenter.com/ims/2020/12/32-weeks-pregnant-recolored-app.png']
    },
    {
        week: 33,
        babyDevelopment: "At 33 weeks, your baby's skull bones remain flexible and unfused, allowing movement and overlap during birth. The baby's skin is becoming less wrinkled, appearing soft and smooth as it plumps up in preparation for delivery. Though the womb is getting snug, the fetal movement remains consistent, and kicks may be felt in new areas as the baby adjusts to a head-down position. The baby, approximately the size of a pineapple, measures 17.36 inches and weighs around 4.77 pounds.",
        pregnancySymptoms: [
            "Trouble sleeping due to physical discomfort and anxiety",
            "Wrist pain from carpal tunnel syndrome",
            "Swollen labia caused by increased blood flow and hormonal changes",
            "Frequent urination due to the growing uterus pressing on the bladder",
            "Shortness of breath as the uterus expands",
            "Occasional 'pregnancy brain' phenomenon characterized by forgetfulness"
        ],
        pregnancyChecklist: [
            "Think about grandparent names",
            "Do kick counts to monitor fetal movement",
            "Ensure you have an adequate supply of baby clothes",
            "Start to childproof the baby's nursery"
        ],
        images: ['https://www.babycenter.com/pregnancy/week-by-week/33-weeks-pregnant',
            'https://assets.babycenter.com/ims/2020/12/33-weeks-pregnant-recolored-app.png']
    },
    {
        week: 34,
        babyDevelopment: "At 34 weeks, your baby's development includes fully grown fingernails and the gradual plumping up of limbs. Your baby is responsive to sounds, light, and touch, with fully formed ears expected by the next week. At this stage, the baby is about the size of a cantaloupe, measuring 17.84 inches and weighing 5.24 pounds.",
        pregnancySymptoms: [
            "Aches and pains, particularly in the pelvic and lower back areas",
            "Constipation due to hormonal changes",
            "Noticeable Braxton Hicks contractions, typically not painful",
            "Fatigue",
            "Changes in vaginal discharge, with colostrum leakage from the breasts"
        ],
        pregnancyChecklist: [
            "Consider a postpartum doula for support after birth",
            "Go shoe shopping due to potential changes in foot size from swelling",
            "Try perineal massage to prepare for childbirth",
            "Avoid keepsake ultrasounds from private clinics; ensure ultrasound procedures are conducted by trained professionals",
            "Be aware of signs of preeclampsia, such as swelling and rapid weight gain, for timely medical intervention"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-34-lung-development_square.png',
            'https://assets.babycenter.com/ims/2020/12/34-weeks-pregnant-recolored-app.png']
    },
    {
        week: 35,
        babyDevelopment: "At 35 weeks, the baby is surrounded by approximately a quart of amniotic fluid, which gradually decreases after 36 weeks. The baby's kidneys are fully developed, and urine, which the baby has been producing since 13 weeks, contributes to the amniotic fluid. Distinct sleep patterns are now noticeable, with increased movements during wakefulness and reduced activity during sleep. The baby's size is comparable to a honeydew melon, measuring 18.23 inches and weighing 5.72 pounds.",
        pregnancySymptoms: [
            "Heartburn due to the expanding uterus crowding internal organs",
            "Clumsiness caused by changes in weight distribution",
            "Headaches related to fatigue, hunger, or dehydration",
            "Hemorrhoids resulting from increased pressure and constipation",
            "Development of linea nigra (a dark line down the belly's center)",
            "Vision changes like blurry vision and dry eyes"
        ],
        pregnancyChecklist: [
            "Become familiar with signs of labor",
            "Recognize early indications such as the baby dropping lower in the pelvis, increased Braxton Hicks contractions, and possible bloody discharge",
            "Check the cervix for dilation and effacement",
            "Monitor contractions' frequency and intensity",
            "Install the baby's car seat",
            "Wash baby clothes and bedding",
            "Continue safe exercise, with modifications if necessary"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-35-fetal-weight_square.png',
            'https://assets.babycenter.com/ims/2020/12/35-weeks-pregnant-recolored-app.png']
    },
    {
        week: 36,
        babyDevelopment: "At 36 weeks, the baby's lungs are prepared for breathing outside the womb. Baby bones are hardening, though still softer than adult bones, and some are made of flexible cartilage. The baby is shedding lanugo and vernix, swallowing them along with other secretions to create meconium, the blackish substance seen in early poops. The baby's size is approximately that of a head of romaine lettuce, measuring 18.62 inches and weighing 6.20 pounds.",
        pregnancySymptoms: [
            "Mild cramping",
            "Headaches",
            "Changes in vaginal discharge",
            "Dizziness due to cardiovascular changes",
            "Pelvic pain caused by hormonal shifts and changes in weight distribution"
        ],
        pregnancyChecklist: [
            "Pack a hospital bag with essentials",
            "Understand signs of labor",
            "Prepare food ahead for postpartum",
            "Find a pediatrician for the baby, asking about accepting new patients, insurance, office hours, availability, and hospital affiliations"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-36-vernix-caseosa_square.png',
            'https://assets.babycenter.com/ims/2020/12/36-weeks-pregnant-recolored-app.png']
    },
    {
        week: 37,
        babyDevelopment: "At 37 weeks, the baby's hair may range from peach fuzz to a full head, and its color may differ from the parents'. Baby's true eye color might not be evident at birth, with dark blue or slate-gray eyes gradually changing over the first year. The baby is gaining weight, and added fat is smoothing the skin to provide warmth after birth. The baby is approximately the size of a bunch of Swiss chard, measuring 19.02 inches and weighing 6.68 pounds.",
        pregnancySymptoms: [
            "More frequent Braxton Hicks contractions",
            "Breasts leaking colostrum",
            "Increased vaginal discharge or spotting",
            "Continued monitoring of the baby's movements",
            "Gas, bloating, lower back pain, and nesting instincts"
        ],
        pregnancyChecklist: [
            "Plan a birth announcement",
            "Have the car seat checked by certified technicians",
            "Indulge in nesting instincts, but stay mindful of health and safety"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-37-hair-growth_square.png',
            'https://assets.babycenter.com/ims/2020/12/37-weeks-pregnant-recolored-app.png']
    },
    {
        week: 38,
        babyDevelopment: "At 38 weeks, the baby's nails are fully formed, and fat accumulation provides smooth skin. The baby measures about 19.41 inches and weighs 7.13 pounds, resembling the size of a leek. Common symptoms include swollen ankles, trouble sleeping due to insomnia, intense pregnancy dreams, lightning crotch (a sharp, short-lived pelvic or groin pain), different vaginal discharge indicating the loss of the mucus plug, heartburn, and nausea.",
        pregnancySymptoms: [
            "Swollen ankles",
            "Trouble sleeping due to insomnia",
            "Intense pregnancy dreams",
            "Lightning crotch (sharp, short-lived pelvic or groin pain)",
            "Different vaginal discharge indicating the loss of the mucus plug",
            "Heartburn",
            "Nausea"
        ],
        pregnancyChecklist: [
            "Monitor for late-pregnancy complications",
            "Have the house cleaned",
            "Read up on baby feeding, considering both breastfeeding and formula feeding options",
            "Familiarize yourself with newborn screening tests for rare but serious conditions"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-38-eye-color_square.png',
            'https://assets.babycenter.com/ims/2020/12/38-weeks-pregnant-recolored-app.png']
    },
    {
        week: 39,
        babyDevelopment: "At 39 weeks, the baby continues to accumulate fat, measuring around 19.72 inches and weighing 7.57 pounds. The baby's reflexes, including a firm grasp, are well-developed, allowing interaction once born. Common symptoms include monitoring baby kicks for any decrease in activity, changes in the cervix during prenatal checkups, the possibility of leaking fluid or amniotic sac rupture, diarrhea potentially signaling early labor, pelvic pain, intensified mood swings, and alterations in vaginal discharge.",
        pregnancySymptoms: [
            "Monitoring baby movements is crucial, and any significant decrease should be reported to the doctor.",
            "Changes in the cervix can be checked during a prenatal exam, and leaking fluid or amniotic sac rupture requires immediate attention.",
            "Diarrhea may or may not indicate imminent labor, and consulting a healthcare provider is recommended.",
            "Pelvic pain, mood swings, and changes in vaginal discharge are common as the due date approaches."
        ],
        pregnancyChecklist: [
            "Learn about postpartum body changes",
            "Stock up on light entertainment for early labor distraction",
            "Prepare for after-birth necessities such as maxi pads, postpartum underwear, and nursing bras",
            "Write down pregnancy memories through journaling to capture the unique moments of this emotional time"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-39-mature-lungs_square.png',
            'https://assets.babycenter.com/ims/2020/12/39-weeks-pregnant-recolored-app.png']
    },
    {
        week: 40,
        babyDevelopment: "At 40 weeks, the average baby weight is between 7 and 8 pounds, with an average length of about 20 inches. The baby's skin color at birth changes from reddish-purple to pinkish-red, and soft spots called fontanels are present on the baby's skull.",
        pregnancySymptoms: [
            "A healthcare provider may check the cervix for ripening",
            "The possibility of the water breaking",
            "Back pain due to increased weight and strain",
            "Distinguishing between Braxton Hicks contractions and real labor contractions",
            "Experiencing insomnia",
            "Feeling pelvic pain and pressure as the baby drops lower in preparation for birth"
        ],
        pregnancyChecklist: [
            "Do exercises to prepare for labor",
            "Finalize the baby names list",
            "Learn about post-birth procedures and hospital protocols",
            "Take time to relax and indulge in favorite activities before the baby arrives"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-40-soft-spots_square.png',
            'https://assets.babycenter.com/ims/2020/12/40-weeks-pregnant-recolored-app.png']
    },
    {
        week: 41,
        babyDevelopment: "At 41 weeks, your baby is considered 'late-term,' potentially larger than average, and may have lost most of the vernix, the waxy coating on their skin. The estimated weight is around 8.35 pounds, and the length is approximately 20.39 inches.",
        pregnancySymptoms: [
            "Anxiety due to being overdue",
            "Importance of monitoring fetal movements",
            "Possible non-stress tests to check the baby's well-being",
            "Significance of a slowdown in activity",
            "Checking for signs of water breaking",
            "Cervical dilation and effacement progress",
            "Bloody show as a sign of labor preparation",
            "Potential for nausea, which can be a sign of preeclampsia if persistent or new"
        ],
        pregnancyChecklist: [
            "Manage anxiety through stress-reducing activities",
            "Keep track of baby movements",
            "Be aware of signs like leaking fluid or bloody show",
            "Consider self-care and indulgence while waiting for labor to begin",
            "Connect with other moms-to-be for support",
            "Treat yourself to relaxing activities during this waiting period"
        ],
        images: ['https://assets.babycenter.com/ims/2018/06/pregnancy-week-41-amniotic-fluid_square.png',
            'https://assets.babycenter.com/ims/2020/12/41-weeks-pregnant-recolored-app.png']
    }

]

function getDateByConception(date) {
    let givenDate = new Date(date);
    let millisecondsIn38Weeks = 38 * 7 * 24 * 60 * 60 * 1000;

    // Add the milliseconds to the given date
    var futureDate = new Date(givenDate.getTime() + millisecondsIn38Weeks);
    return futureDate;
}

function getDateByLmp(date) {
    let givenDate = new Date(date);
    let millisecondsIn40Weeks = 40 * 7 * 24 * 60 * 60 * 1000;

    // Add the milliseconds to the given date
    var futureDate = new Date(givenDate.getTime() + millisecondsIn40Weeks);
    return futureDate;
}

function calculateWeekOfPregnancy(startDate, calculationType) {
    const startDateObj = new Date(startDate);
    const currentDate = new Date();
    let timeDifference;

    if (calculationType === 'conception') {
        timeDifference = currentDate.getTime() - startDateObj.getTime();
    } else if (calculationType === 'lmp') {
        const lmpDate = new Date(startDateObj.getTime() - (14 * 24 * 60 * 60 * 1000));
        timeDifference = currentDate.getTime() - lmpDate.getTime();
    } else {
        throw new Error('Invalid calculation type. Please specify either "conception" or "lmp".');
    }

    // Convert the time difference from milliseconds to weeks
    const weeksElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    // Add 1 to the weeks elapsed, as pregnancy is counted from the start of the LMP or conception
    return weeksElapsed + 1;
}

app.get("/", function (req, res) {
    res.render("mainpage.ejs");
});

app.get("/calendar", function(req, res) {
    res.render("calendar.ejs");
});

app.get("/pregnancy-tracker", function(req, res) {
    res.render("index.ejs");
});

app.get("/register", function(req, res) {
    res.render("register.ejs");
});

app.get("/login", function(req, res) {
    res.render("login.ejs");
});

app.get("/nutrition", function(req, res) {
    res.render("nutrition.ejs");
});

app.post("/calculate", async function (req, res) {
    const request = req.body;
    let dueDate;
    let weeksOfPregnancy;
    if (request.calculationType === 'conception') {
        dueDate = getDateByConception(request.actualDate);
        weeksOfPregnancy = calculateWeekOfPregnancy(request.actualDate, 'conception');
    }
    else {
        dueDate = getDateByLmp(request.actualDate);
        weeksOfPregnancy = calculateWeekOfPregnancy(request.actualDate, 'lmp');
    }

    let week_data;
    for (let i = 0; i < weeks.length; i++) {
        if (weeks[i].week === weeksOfPregnancy) {
            week_data = weeks[i];
            break;
        }
    }
    res.json({ dueDate: dueDate, weeksPregnant: weeksOfPregnancy, weekData: week_data }); // Send JSON response
});

app.post("/register", async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;
    const password = req.body.password;

    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (checkResult.rows.length > 0) {
        res.send("Email already exists. Try logging in.");
      } else {
        // Password Hashing
        bcrypt.hash(password, saltRounds, async function(err, hash) {
          if (err) {
            console.log(err);
          }
          else {
            const result = await db.query(
              "INSERT INTO users (name, age, email, password) VALUES ($1, $2, $3, $4)",
              [name, age, email, hash]
            );
            res.redirect("/");
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
  
  app.post("/login", async (req, res) => {
    const email = req.body.email;
    const loginPassword = req.body.password;
  
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
  
        bcrypt.compare(loginPassword, storedHashedPassword, function(err, result) {
          if (err) {
            console.log(err);
          }
          else {
            console.log(result);
            if (result == true) {
              res.redirect("/");
            }
            else {
              res.send("Incorrect Password");
            }
          }
        });
      } else {
        res.send("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  });
  

app.listen(port, function () {
    console.log("Listening on port 3000");
});