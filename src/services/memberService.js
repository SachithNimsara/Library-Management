import { api } from './api'

export const memberService = {
  getAllMembers: async () => {
    const response = await api.get('/members')
    return response.data
  },

  addMember: async (memberData) => {
    const response = await api.post('/members', memberData)
    return response.data
  },

  updateMember: async (id, memberData) => {
    const response = await api.put(`/members/${id}`, memberData)
    return response.data
  },

  deleteMember: async (id) => {
    const response = await api.delete(`/members/${id}`)
    return response.data
  }
}