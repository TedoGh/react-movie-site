import "./ActorDetail.css";

interface IActor {
  profile_path: string;
  name: string;
  biography: string;
}

interface IActorInfo {
  personInfo: IActor;
}

export default function ActorDetail({ personInfo }: IActorInfo) {
  return (
    <div className="actor">
      <div className="actor-info">
        <div className="actor-left">
          <img
            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${personInfo.profile_path}`}
          />
        </div>
        <div className="actor-right">
          <div className="actor-info-details">
            <h1 style={{ marginBottom: "30px" }}>{personInfo.name}</h1>
            <h3 style={{ fontSize: "20px" }}>Biography</h3>
            <p style={{ marginTop: "20px" }}>{personInfo.biography}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
