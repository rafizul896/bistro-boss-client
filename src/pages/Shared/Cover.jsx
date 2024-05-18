const Cover = ({ img, title, description }) => {
    return (
        <div className="hero h-[350px] md:h-[700px]" style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-content text-center text-neutral-content min-h-[100px] md:min-h-[300px] w-[70%] bg-black/45">
                <div className="max-w-md space-y-5">
                    <h1 className="text-2xl md:text-5xl font-bold uppercase">{title}</h1>
                    {
                        description &&
                        <p>{description}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Cover;