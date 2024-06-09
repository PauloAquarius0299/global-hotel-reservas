import AddHotelForm from "@/components/hotel/AddHotelForm";



interface HotelPageProps {
    params: {
        hotelId: string ;
    };
}

const Hotel = ({ params }: HotelPageProps) => {
    const hotel = params?.hotelId;

    /*if (!hotelId) return <div>Invalid Hotel ID...</div>;

    const hotel = await getHotelById(hotelId);
    const { userId } = auth();

    if (!userId) return <div>Not Authenticated...</div>;

    if (hotel && hotel.userId !== userId) return <div>Access Denied...</div>;*/

    return (
        <div>
            <AddHotelForm hotel={hotel} />
        </div>
    );
};

export default Hotel;
