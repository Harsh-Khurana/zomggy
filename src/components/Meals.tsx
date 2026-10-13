import MealItem from "./MealItem"
import useHttp from "../hooks/useHttp"
import Error from "./UI/Error"

export type Meal = {
  id: string
  name: string
  price: string
  description: string
  image: string
}

const requestConfig = {}

export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp<Meal[]>("http://localhost:3000/meals", requestConfig, [])

  if (isLoading) {
    return <p className="center">Fetching meals...</p>
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />
  }

  return (
    <ul id="meals">
      {meals.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  )
}
