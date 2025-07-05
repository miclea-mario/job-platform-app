const ProfileSuccess = ({ name, role = 'Admin' }) => {
  return (
    <div className="flex flex-col text-right">
      <h4 className="text-sm font-semibold text-secondary invert">{name}</h4>
      <p className="text-xs font-semibold capitalize text-foreground invert">{role}</p>
    </div>
  );
};

export default ProfileSuccess;
