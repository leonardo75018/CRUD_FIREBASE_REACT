import { firebase } from "./firebase"
import React, { useEffect, useState } from "react"






function App() {
  const [taches, setTaches] = useState([])
  const [tache, setTache] = useState("")
  const [modeEdit, setModeEdit] = useState(false)
  const [id, setId] = useState("")
  console.log(id)


  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore()
      try {
        const data = await db.collection("taches").get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setTaches(arrayData)
      } catch (error) { console.log(error) }
    }
    getData()
  }, [])

  const addTache = async (e) => {
    e.preventDefault()
    if (!tache.trim()) {
      console.log("champ tache vide")
      return
    }
    try {
      const db = firebase.firestore()
      const newTache = { nom: tache }

      const data = await db.collection("taches").add({
        nom: tache
      })
      setTaches([
        ...taches,
        { id: data.id, ...newTache }
      ])

    } catch (error) { console.log(error) }
  }

  const deleteTache = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('taches').doc(id).delete()
      const ArrayFiltre = taches.filter(item => item.id !== id)
      setTaches(ArrayFiltre)

    } catch (error) { console.log(error) }
  }

  const activerEddition = (item) => {
    setModeEdit(true)
    setTache(item.nom)
    setId(item.id)
  }

  const update = async (e) => {
    e.preventDefault()
    if (!tache.trim()) {
      console.log('vacio')
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection('taches').doc(id).update({
        nom: tache
      })
      const ArrayFiltre = taches.map(item => (
        item.id === id ? { id: item.id, nom: tache } : item
      ))
      setTaches(ArrayFiltre)
      setModeEdit(false)
      setId("")
      setTache("")

    } catch (error) { console.log(error) }
  }



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h3>liste des taches</h3>
          <ul className="list-group">{

            taches.map(item => (
              <li className="list-group-item" key={item.id}>
                <span> {item.nom}</span>
                <button
                  className="btn btn-danger btn-sm float-right"
                  onClick={() => deleteTache(item.id)}
                >
                  Effacer
                    </button>
                <button
                  className="btn btn-warning btn-sm float-right mr-2"
                  onClick={() => activerEddition(item)}
                >
                  Modifier
                    </button>
              </li>
            ))
          }
          </ul>
        </div>


        <div className="col-md-6">
          {
            modeEdit ? "Modifier cette tache" : "Ajoutez votre tache"
          }
          <form onSubmit={modeEdit ? update : addTache}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder='Ajoutez une tache'
              value={tache}
              onChange={e => setTache(e.target.value)}
            />
            <button
              type='submit'
              className="btn btn-dark btn-block btn-sm"
            >
              {
                modeEdit ? "Modifier" : "Ajouter"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
