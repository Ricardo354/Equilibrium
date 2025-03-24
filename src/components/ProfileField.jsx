const ProfileField = ({label, value, canEdit}) => (
    <p className="p-4">
        <span className="font-bold text-desktop-bg">{label}:</span> {value}
    {canEdit && (
        <button className="h-5 w-5 m-2 py-0.5"><img src="https://www.svgrepo.com/show/522527/edit-3.svg" alt="editar" /></button>
    )}
    </p>    
);

export default ProfileField;