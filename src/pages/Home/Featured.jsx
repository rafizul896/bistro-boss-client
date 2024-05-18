import SectionTitle from "../../components/SectionTitle";
import featured from '../../assets/home/featured.jpg'

const Featured = () => {
    return (
        <section className="mt-10 md:px-14 lg:px-32 bg-fixed bg-[url('https://i.imghippo.com/files/s9ze61715966854.jpg')] bg-cover bg-no-repeat">
            <div className="bg-slate-500/30 pb-12 pt-5 text-white">
                <SectionTitle
                    subHeading={'Check it out'}
                    heading={'FROM OUR MENU'}
                ></SectionTitle>
                <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 text-white">
                    <div>
                        <img src={featured} alt="" />
                    </div>
                    <div className="space-y-2 px-2">
                        <p>July 20, 2025</p>
                        <p className="text-lg">WHERE CAN I GET SOME?</p>
                        <p >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                        </p>
                        <div className="flex justify-end md:justify-start">
                            <button className="px-5 py-2.5 border-b rounded-lg hover:bg-[#1F2937] hover:text-[#BB8506] font-medium">READ MORE</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;