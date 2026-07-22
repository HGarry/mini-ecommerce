import Image from 'next/image'

function About() {
  return (
    <div>
      <Image src="https://images.pexels.com/photos/30650522/pexels-photo-30650522.jpeg" alt="img" width={500} height={500} style={{width: 300,marginBottom: "1rem", objectFit: "cover"}}/>

      <Image src="https://images.pexels.com/photos/17196119/pexels-photo-17196119.jpeg" alt="img" width={500} height={500} style={{width: 300,marginBottom: "1rem", objectFit: "cover"}}/>

    </div>
  )
}

export default About