import { useParams } from '@remix-run/react';

const concertsCity = () => {
    const params = useParams();
    return (
        <div>
            <h1>
                Concerts in {params.city}
            </h1>
        </div>
    )
}

export default concertsCity
