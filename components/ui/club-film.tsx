type FilmProps = { name: 'group-session' | 'gagan-interview'; title: string };

export default function ClubFilm({ name, title }: FilmProps) {
  return (
    <figure className="club-film">
      <figcaption>{title}</figcaption>
      <video controls playsInline preload="none" poster={`/images/${name}.webp`} aria-label={title}>
        <source src={`/videos/${name}.mp4`} type="video/mp4"/>
        <a href={`/videos/${name}.mp4`}>Watch {title}</a>
      </video>
    </figure>
  );
}
