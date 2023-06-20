import {create} from "zustand"


export const useStore=create(((set) =>({
    user:null,
    setUser:(item) => set((state) => ({user:item})),
    resetUser:() => set((state) => ({user:null})),
    session:null,
    setSession:(item) => set((state) => ({session:item})),
    resetSession:() => set((state) => ({session:null})),
    projects:[],
    setProjects:(item) => set((state) => ({projects:[item,...state.projects]})),
    deleteProject:(id) => set((state) => ({projects: state.projects.filter(item => item.id!=id)})),
    globalLoading:true,
    setGlobalLoading:(val) => set((state) => ({globalLoading:val}))
})))
