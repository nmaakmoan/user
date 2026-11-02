import { FormEvent, useState } from "react"
import axios from "axios"
import "./App.css"

interface User {
  id: number
  username: string
  email: string
}

function App() {
  const [search, setSearch] = useState("")
  const [email, setEmail] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState("")

  const searchUsers = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError("")
    setSearched(true)

    try {
      const response = await axios.get<User[]>(
        "http://127.0.0.1:8000/api/users/",
        {
          params: {
            search: search.trim(),
            email: email.trim()
          }
        }
      )
      setUsers(response.data)
    } catch (err) {
      console.error(err)
      setUsers([])
      setError("Не удалось загрузить пользователей. Проверь, запущен ли Django.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page">
      <section className="panel">
        <div className="eyebrow">DJANGO + REACT + AXIOS</div>
        <h1>Поиск пользователей</h1>
        <p className="description">Найди пользователя по имени или электронной почте.</p>

        <form className="search-form" onSubmit={searchUsers}>
          <label>
            Username
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Например, mag"
            />
          </label>
          <label>
            Email
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Например, gmail"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Ищем..." : "Найти"}
          </button>
        </form>

        <div className="results">
          <div className="results-heading">
            <h2>Результаты</h2>
            {searched && !loading && !error && (
              <span>{users.length} пользователей</span>
            )}
          </div>

          {loading && <p className="message">Загрузка...</p>}
          {error && <p className="message error">{error}</p>}
          {!loading && !error && searched && users.length === 0 && (
            <p className="message">Пользователи не найдены</p>
          )}

          {!loading && users.map((user) => (
            <article className="user" key={user.id}>
              <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
              <div>
                <h3>{user.username}</h3>
                <p>{user.email || "Email не указан"}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
