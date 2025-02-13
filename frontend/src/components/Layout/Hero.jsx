import { Link } from "react-router-dom";
import heroImg from "../../assets/cover.jpg";

const Hero = () => {
  return (
    <section className="relative">
        <img src={heroImg} alt='rabbit' className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
            <div className="text-center text-gray-900 p-6">
                <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">Book <br/> Appointment
                </h1>
                <p className="text-sm tracking-tighter md:text-lg mb-6">
                Find & Book the Best Doctors Near You
                </p>
                <Link to="/appointment" className="bg-gray-700 text-white px-6 py-2 rounded-sm text-lg hover:bg-gray-900">Book Now</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero