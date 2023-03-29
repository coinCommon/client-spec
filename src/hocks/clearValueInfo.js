export default function ClearValueInfo(setInfoAppendSuccess,
                                       setFloors,
                                       setSeasons,
                                       setColors,
                                       setMaterials,
                                       setDensity,
                                       setCompleteness,
                                       setComposition,
                                       setProtective,
                                       setClothes) {
    setInfoAppendSuccess([])
    setFloors({title: '', description: '', number: Date.now()})
    setSeasons({title: '', description: '', number: Date.now()})
    setColors({title: '', description: '', number: Date.now()})
    setMaterials({title: '', description: '', number: Date.now()})
    setDensity({title: '', description: '', number: Date.now()})
    setCompleteness({title: '', description: '', number: Date.now()})
    setComposition({title: '', description: '', number: Date.now()})
    setProtective({title: '', description: '', number: Date.now()})
    setClothes([])

}
