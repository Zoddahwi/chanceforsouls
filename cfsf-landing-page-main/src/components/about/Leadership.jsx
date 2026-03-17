import React from 'react';
import './Leadership.css';

const leaders = [
  {
    name: 'Mrs. Evelyn Benjamin-Sampson',
    role: 'Founder & Executive Director',
    bio: 'Author, counselor, and motivational speaker. Holds a Master\'s in Development Economics and Executive Certificate in Counselling. Worked 16 years with OATUU as Gender and Youth Coordinator.',
    profilePhoto: '/images/Mrs Evelyn.jpg',
    profileLink: '/leader/evelyn-benjamin-sampson',
    linkedIn: 'https://www.linkedin.com/in/evelyn-benjamin-sampson',
  },
  {
    name: 'Rev. Emmanuel Agyei Kwafo',
    role: 'National Patron - Home and Urban Missions, Church of Pentecost',
    bio: 'Ordained minister and leader focused on missions among the marginalized. Conference speaker, author of 5 books, and adjunct lecturer at Pentecost University.',
    profilePhoto: '/images/rev_kwafo_profile.jpg',
    profileLink: '/leader/rev-kwafo',
    linkedIn: 'https://www.linkedin.com/in/rev-emmanuel-kwafo',
  },
  {
    name: 'Daniel Ledi',
    role: 'Legal & Compliance Officer',
    bio: 'Legal practitioner licensed to practice law in Ghana. Currently serves as Legal and Compliance Officer for SUNU Assurances Ghana LTD.',
    profilePhoto: '/images/daniel_ledi_profile.jpg',
    profileLink: '/leader/daniel-ledi',
    linkedIn: 'https://www.linkedin.com/in/daniel-ledi',
  },
  {
    name: 'Deaconess Mrs Faustina Konadu Akomeah',
    role: 'Marriage Counselor & Educational Coordinator',
    bio: 'Marriage counselor and therapy expert with MA in TESL. Serves as Registrar at School of Marriage, PIWC Ablekuma, and Early Childhood Coordinator at Ghana Education Service.',
    profileLink: '/leader/deaconess-faustina',
    linkedIn: 'https://www.linkedin.com/in/faustina-akomeah',
  },
  {
    name: 'Mary Tobbin Osei',
    role: 'Social Development Consultant & Business Entrepreneur',
    bio: 'Social Development Consultant with 29 years of experience. CEO of Kanko Limited, Founder of Sustainable Development Alliance (SusDA), and Board Member of COLANDEF, PENTSOS, and Mobipay Ltd.',
    profilePhoto: '/images/mary_tobbin_osei.jpg',
    profileLink: '/leader/mary-tobbin-osei',
    linkedIn: 'https://www.linkedin.com/in/mary-tobbin-osei',
  },
];

export default function Leadership() {
  return (
    <section id='leadership' className='leadership-section'>
      <div className='leadership-container'>
        <div className='section-header'>
          <h2 className='section-title'>Board of Advisors</h2>
          <p className='section-subtitle'>
            Meet the dedicated leaders guiding our mission to transform lives
          </p>
        </div>

        <div className='leaders-grid'>
          {leaders.map((person) => (
            <article key={person.name} className='leader-card'>
              <div className='card-gradient-border'></div>

              <div className='leader-header'>
                {person.profilePhoto ? (
                  <div className='profile-photo-wrapper'>
                    <img
                      src={person.profilePhoto}
                      alt={person.name}
                      className='profile-photo'
                    />
                    <div className='photo-ring'></div>
                  </div>
                ) : (
                  <div className='profile-initials'>
                    {person.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                )}
              </div>

              <div className='leader-content'>
                <h3 className='leader-name'>{person.name}</h3>
                <p className='leader-role'>{person.role}</p>
                <p className='leader-bio'>{person.bio}</p>

                <div className='leader-actions'>
                  {person.profileLink && (
                    <a href={person.profileLink} className='profile-link'>
                      <span>View Full Profile</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M5 12h14M12 5l7 7-7 7' />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
