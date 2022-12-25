import React, { useState, useEffect } from 'react';

const dengueFactPrompts = [
  'In Vietnam, the medical code system that is most commonly used for medical supplies is the International Classification of Health Interventions (ICHI). The ICHI is a standardized system of codes that is used to classify and describe health interventions, including medical procedures, treatments, and services.',
  'In the International Classification of Diseases (ICD), dengue fever is classified under code A90.',
  'HCPCS (Healthcare Common Procedure Coding System) codes are a standardized system of codes used to identify medical procedures, supplies, and equipment in the United States.',
  'The symptoms of dengue fever include fever, headache, muscle and joint pain, and rash. In severe cases, dengue fever can progress to dengue hemorrhagic fever, which is a more serious and potentially life-threatening form of the disease.',
  'Dengue virus is transmitted to humans through the bite of an infected mosquito. The mosquitoes that transmit dengue virus are most active during the day and prefer to bite humans.',
  'There is no specific treatment for dengue fever, so prevention is the best way to reduce the risk of infection. Measures that can help to prevent dengue fever include using mosquito nets, wearing long-sleeved clothing, using insect repellents, and eliminating mosquito breeding sites.',
  'Treatment for dengue fever typically involves supportive care to help manage the symptoms of the disease. This may include medications to reduce fever and pain, and fluids to prevent dehydration. In severe cases, hospitalization may be necessary.',
  'There are several vaccines that are approved for the prevention of dengue fever, but they are not universally available and may not provide complete protection against all strains of the virus.',
];

const sectionPrompts = {
  Dashboard: 'Patients can be categorized into different phases of fever',
  Facilities: 'Nurses ought to be assigned to rooms and patients to beds',
  Nurses: 'Effective communication is key for success',
  Devices: 'Magical little metal boxes'
}


const Prompt = (props) => {
  const [promptTransition, setPromptTransition] = useState('');
  useEffect(() => {
    setPromptTransition(() => 'ml-[8rem] opacity-0');
    setTimeout(() => {
      setPromptTransition(() => 'ml-4');
    }, 500);
  }, [props.heading]);
  return (
    <div className={`transition-all duration-500 ease-out text-pink-500 text-[18px] italic font-font-inter ${promptTransition}`}>
      {sectionPrompts[`${props.heading}`]}
    </div>
  );
};

export default Prompt;
