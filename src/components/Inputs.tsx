const Inputs = ({ siteConnected }: InputsProps) => (
    <div className={!siteConnected ? 'opacity-50' : ''}>
      <div className="my-3">
        <input
          type="text"
          name="handle"
          className="input input-bordered block w-full focus:ring focus:outline-none"
          placeholder="Recipient Twitter Handle"
          disabled={!siteConnected}
        />
      </div>
      <div className="my-3">
        <input
          name="ether"
          type="text"
          className="input input-bordered block w-full focus:ring focus:outline-none"
          placeholder="Amount in ETH"
          disabled={!siteConnected}
        />
      </div>
    </div>
  );
  
  type InputsProps = {
    siteConnected: boolean,
  };
  
  export default Inputs;
  