const Title = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const username = urlParams.get('username');
    const address = urlParams.get('address');

    return (
        <>
            <h1 className="text-xl font-semibold text-gray-700 text-center" >
                Send ETH Payment
            </h1>

            {username &&
                <h2 className="text-l font-semibold text-gray-700 text-center">
                    Hello @{username} ({address})
                </h2>
            }
        </>
    );
}

export default Title;
