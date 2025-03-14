const userService = require('../services/userService');

/* exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const userProfile = await userService.getUserById(userId);
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
 */
exports.updateProfile = async (req, res) => {
    const data = req.body;

    try {
        const result = await userService.updateProfile(data);
        res.status(200).json({ mensaje: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(401).json({ error: "No se pudo actualizar el usuario" });
    }
};