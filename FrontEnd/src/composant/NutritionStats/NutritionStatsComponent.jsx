import "../NutritionStats/NutritionStatsComponent.css";
export default function NutritionStats(props) {
  return (
    <div className='container-NutritionStats'>
      <img src={props.img} alt='ilustration' className='img-NutritionStats' />
      <div>
        <p className='Stats-NutritionStats'>{props.stats}</p>
        <p className='Nutri-NutritionStats'>{props.nutri}</p>
      </div>
    </div>
  );
}
