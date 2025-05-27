import React from 'react';

const MapEmbed: React.FC = () => {
  return (
    <div className='max-w-[500px] w-full max-h-[350px] h-full border-2 border-gray-300 rounded-xl overflow-hidden'>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.756026630429!2d106.65559359678954!3d10.753276900000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752931d1e84f09%3A0x3d3303327fa81758!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBIw7luZyBWxrDGoW5nIFRQIEhDTQ!5e0!3m2!1sen!2s!4v1747675732968!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
