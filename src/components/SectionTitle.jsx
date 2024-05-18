const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="flex flex-col justify-center items-center py-10 space-y-2">
            <p className="text-[#D99904] md:text-xl">---{subHeading}---</p>
            <h2 className="text-2xl md:text-4xl font-medium border-y-4 py-2 md:py-3 px-8 md:px-14">{heading}</h2>
        </div>
    );
};

export default SectionTitle;